/// <reference lib="webworker" />
import { filter, fromEvent, switchMap } from "rxjs";
import {
	AllQuestionData,
	SingleQuestionData,
} from "../shared/types/question-data";

type FontData = {
	fontSize: number;
	fontFamily: string;
};

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 900;
const DEPLOYMENT_WIDTH = 109; // 1問ごとの幅
const QUESTION_NUMBERS = [
	"①",
	"②",
	"③",
	"④",
	"⑤",
	"⑥",
	"⑦",
	"⑧",
	"⑨",
	"⑩",
	"⑪",
	"⑫",
	"⑬",
	"⑭",
	"⑮",
	"⑯",
	"⑰",
	"⑱",
	"⑲",
	"⑳",
];

/**
 * フォントの高さ(px)を取得するクラス。getメソッドで取得する。
 * 一度計算したフォント高さはキャッシュしておき、それを返す。
 */
class CharHeight {
	private cachedCharHeight: Record<string, number> = {};
	private ctx: OffscreenCanvasRenderingContext2D;

	constructor() {
		const ctx = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).getContext(
			"2d",
		);
		if (!ctx)
			throw new Error("1文字の高さ取得用CanvasのContext取得に失敗しました");
		this.ctx = ctx;
	}

	public get(fontData: FontData) {
		const cacheKey = `${fontData.fontSize}_${fontData.fontFamily}`;
		if (cacheKey in this.cachedCharHeight) {
			return this.cachedCharHeight[cacheKey];
		}

		this.ctx.font = `${fontData.fontSize}px "${fontData.fontFamily}"`;
		const charHeight = this.ctx.measureText("あ").width;

		// 結果をキャッシュに保存
		this.cachedCharHeight[cacheKey] = charHeight;

		return charHeight;
	}
}

abstract class AbstractKanjiTestCanvas {
	protected readonly charHeight: CharHeight;
	protected readonly canvas: OffscreenCanvas;
	protected readonly ctx: OffscreenCanvasRenderingContext2D;
	protected readonly fontFamily: string;
	protected readonly allQuestionData: AllQuestionData;
	protected readonly defaultFontData: FontData;
	protected readonly maxHeight: number;

	constructor(charHeight: CharHeight, allQuestionData: AllQuestionData) {
		this.charHeight = charHeight;
		this.allQuestionData = allQuestionData;
		this.maxHeight = allQuestionData.questions.length < 10 ? 800 : 360;
		// Canvasの生成
		const canvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("CanvasのContext取得に失敗しました");
		this.canvas = canvas;
		this.ctx = ctx;

		// UAに応じたFontFamilyの決定
		this.fontFamily = AbstractKanjiTestCanvas.selectFont();

		// 最初のフォントデータを設定
		const fontData: FontData = { fontSize: 27, fontFamily: this.fontFamily };
		this.setFontData(fontData);
		this.defaultFontData = fontData;
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
	}

	/**
	 * 使用するFontFamilyを決定するメソッド。
	 * コンストラクタでのみ使用するため、privateでstaticなメソッドとしている。
	 * @returns UAに応じたFontFamily
	 */
	protected static selectFont() {
		let fontFamily = "";

		const ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("windows nt") !== -1) {
			// Windowsの場合、フォントを游明朝に設定
			fontFamily = "游明朝";
		} else {
			fontFamily = "Noto Serif JP";
		}

		return fontFamily;
	}

	/**
	 * このCanvasのContextのFont情報を設定するメソッド
	 * @param fontData Font情報
	 */
	protected setFontData(fontData: FontData) {
		this.ctx.font = `${fontData.fontSize}px "${fontData.fontFamily}"`;
	}

	/**
	 * 文字サイズを自動調節するメソッド。問題文の長さに合わせて、枠に入り切るようにフォントサイズを縮小する。
	 * @param textLength 問題文の長さ
	 * @param maxHeight 問題枠の高さ
	 * @param defaultFontSize デフォルトのフォントサイズ(27px)
	 */
	protected modifyFontSize(
		textLength: number,
		maxHeight: number = this.maxHeight,
		defaultFontSize = 27,
	) {
		const nowFontData: FontData = {
			fontSize: defaultFontSize,
			fontFamily: this.fontFamily,
		};
		let charHeight = this.charHeight.get(nowFontData);
		while (textLength * charHeight > maxHeight) {
			nowFontData.fontSize -= 1;
			charHeight = this.charHeight.get(nowFontData);
		}
		return nowFontData.fontSize;
	}

	/**
	 * 与えられたテキストをCanvasに縦書きで描画する。描画を終了したY軸位置を返す。
	 * @param text
	 * @param x
	 * @param y
	 * @param fontData
	 * @returns
	 */
	protected drawTategakiText(
		text: string,
		x: number,
		y: number,
		fontData: FontData,
		fontColor = "black",
	) {
		this.setFontData(fontData);
		const charHeight = this.charHeight.get(fontData);

		let positionXOfTheChar = x;
		let positionYOfTheChar = y;
		for (const [index, currentChar] of Array.from(text).entries()) {
			let charToBeDrawn = currentChar;
			let punctuationFlag = false; // 句読点かどうかのフラグ
			this.ctx.fillStyle = fontColor;

			// 長音記号の場合は❘(0xED9298)に置き換え
			if (currentChar === "ー") {
				charToBeDrawn = "❘";
			}
			// 句読点の場合は右に半文字、上に半文字分表示をずらす。
			if (currentChar === "、" || currentChar === "。") {
				positionXOfTheChar += charHeight / 2;
				positionYOfTheChar -= charHeight / 2;
				punctuationFlag = true;
			}
			this.ctx.fillText(
				charToBeDrawn,
				positionXOfTheChar,
				positionYOfTheChar + charHeight * index,
			); // 文字を描画（y値は現在の文字数分下にずらす）
			// 句読点を表示した後、x,y値がずれるので元に戻す
			if (punctuationFlag) {
				positionXOfTheChar -= charHeight / 2;
				positionYOfTheChar += charHeight / 2;
			}
		}

		const endHeight = positionYOfTheChar + charHeight * text.length;
		return endHeight;
	}

	public abstract draw(): ImageBitmap;
}

class QuestionCanvas extends AbstractKanjiTestCanvas {
	/**
	 * 読み問題の問題箇所の縦線を描画するメソッド
	 * @param ctx
	 * @param questionData
	 * @param charHeight
	 * @param x
	 * @param y
	 */
	private drawReadingQuestionLine(
		questionData: SingleQuestionData,
		charHeight: number,
		x: number,
		y: number,
	) {
		const start = questionData.fullText.indexOf(questionData.targetKanji);
		const margin = 5; // 問題文と縦線の間のマージン
		this.ctx.beginPath();
		this.ctx.moveTo(x + charHeight / 2 + margin, y + charHeight * start);
		this.ctx.lineTo(
			x + charHeight / 2 + margin,
			y + charHeight * (start + questionData.targetKanji.length),
		);
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 1;
		this.ctx.stroke();
	}

	/**
	 * 読み問題を1問描画するメソッド。drawSingleQuestionから呼び出される。
	 * @param questionData
	 * @param x
	 * @param y
	 */
	private drawSingleReadingQuestion(
		questionData: SingleQuestionData,
		x: number,
		y: number,
	) {
		// フォントサイズの調整
		const fontData: FontData = {
			fontSize: this.modifyFontSize(questionData.fullText.length),
			fontFamily: this.fontFamily,
		};
		this.setFontData(fontData);

		// 問題の描画
		this.drawTategakiText(questionData.fullText, x, y, fontData);

		// 問題箇所の縦線の描画
		const charHeight = this.charHeight.get(fontData);
		this.drawReadingQuestionLine(questionData, charHeight, x, y);
	}

	/**
	 * 書き問題用の箱とよみがなを描画するメソッド。箱の描画終了地点のy軸位置を返す。
	 * @param questionData
	 * @param charHeight
	 * @param x
	 * @param y
	 * @returns
	 */
	private drawWrightingQuestionBox(
		questionData: SingleQuestionData,
		charHeight: number,
		x: number,
		y: number,
	) {
		const questionLength = questionData.targetKanji.length;
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 1;
		if (questionLength > 0) {
			// ボックスの描画
			this.ctx.rect(
				x - charHeight,
				y,
				charHeight * 2,
				charHeight * questionLength * 2,
			);
			this.ctx.fill();
			this.ctx.stroke();
		}
		// 1文字ごとの区切りラインの描画
		if (questionLength > 1) {
			for (let i = 0; i < questionLength - 1; i++) {
				this.ctx.beginPath();
				this.ctx.moveTo(x - charHeight, y + charHeight * (i + 1) * 2);
				this.ctx.lineTo(x + charHeight, y + charHeight * (i + 1) * 2);
				this.ctx.stroke();
			}
		}

		// よみがな描画開始高さの設定
		const yomiganaMargin = 15;
		const yomiganaFontSize = 18;
		const boxHalfHeight = y + charHeight * questionLength; // ボックスの真ん中の高さ
		const yomiganaFontData: FontData = {
			fontSize: yomiganaFontSize,
			fontFamily: this.fontFamily,
		};
		const yomiganaCharHeight = this.charHeight.get(yomiganaFontData);
		const yomiganaHalfHeight =
			(questionData.yomigana.length * yomiganaCharHeight) / 2; // よみがなの高さの半分
		const yomiganaStartHeight = boxHalfHeight - yomiganaHalfHeight;

		// よみがなの描画
		this.drawTategakiText(
			questionData.yomigana,
			x + charHeight + yomiganaMargin,
			yomiganaStartHeight,
			yomiganaFontData,
		);

		const endHeight = y + charHeight * questionLength * 2;
		return endHeight;
	}

	/**
	 * 書き問題を1問描画するメソッド。drawSingleQuestionから呼び出される。
	 * @param questionData
	 * @param defaultCharHeight
	 * @param x
	 * @param y
	 */
	private drawSingleWritingQuestion(
		questionData: SingleQuestionData,
		defaultCharHeight: number,
		x: number,
		y: number,
	) {
		const fontData: FontData = {
			fontSize: this.modifyFontSize(
				questionData.fullText.length - questionData.targetKanji.length,
				this.maxHeight -
					defaultCharHeight * questionData.targetKanji.length * 2,
			),
			fontFamily: this.fontFamily,
		};
		if (questionData.fullText.includes(questionData.targetKanji)) {
			const start = questionData.fullText.indexOf(questionData.targetKanji);
			if (start === 0) {
				const endHeight = this.drawWrightingQuestionBox(
					questionData,
					defaultCharHeight,
					x,
					y,
				);
				this.drawTategakiText(
					questionData.fullText.replace(questionData.targetKanji, ""),
					x,
					endHeight,
					fontData,
				);
			} else {
				const strExceptQuestion = questionData.fullText.split(
					questionData.targetKanji,
				);
				let endHeight = this.drawTategakiText(
					strExceptQuestion[0],
					x,
					y,
					fontData,
				);
				endHeight = this.drawWrightingQuestionBox(
					questionData,
					defaultCharHeight,
					x,
					endHeight,
				);
				this.drawTategakiText(strExceptQuestion[1], x, endHeight, fontData);
			}
		}
	}

	/**
	 * 問題を1問描画するメソッド
	 * @param questionNumber
	 * @param questionData
	 * @param x
	 * @param y
	 * @param fontData
	 * @param maxHeight
	 */
	private drawSingleQuestion = (
		questionNumber: number,
		questionData: SingleQuestionData,
		x: number,
		y: number,
		fontData: FontData,
	) => {
		const defaultCharHeight = this.charHeight.get(fontData); // 1文字あたりの高さ
		this.ctx.fillStyle = "black";
		// 問題番号の描画
		this.ctx.fillText(QUESTION_NUMBERS[questionNumber], x, y);
		// y値再設定（問題番号分空ける）
		const newY = y + defaultCharHeight * 1.5;

		if (
			questionData.fullText == null ||
			questionData.questionType == null ||
			questionData.targetKanji == null ||
			questionData.yomigana == null
		)
			return;

		if (questionData.questionType === "yomi") {
			this.drawSingleReadingQuestion(questionData, x, newY);
		} else {
			this.drawSingleWritingQuestion(questionData, defaultCharHeight, x, newY);
		}
	};

	public override draw(): ImageBitmap {
		for (const [
			index,
			questionData,
		] of this.allQuestionData.questions.entries()) {
			const x =
				index < 10
					? CANVAS_WIDTH - DEPLOYMENT_WIDTH * (index + 1)
					: CANVAS_WIDTH - DEPLOYMENT_WIDTH * (index - 10 + 1);
			const y = index < 10 ? 40 : 480;
			this.drawSingleQuestion(index, questionData, x, y, this.defaultFontData);
		}

		// 問題数が10問より多い場合、真ん中に分割線を描画
		if (this.allQuestionData.questions.length > 10) {
			this.ctx.beginPath();
			this.ctx.moveTo(50, CANVAS_HEIGHT / 2);
			this.ctx.lineTo(CANVAS_WIDTH - 50, CANVAS_HEIGHT / 2);
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		}

		return this.canvas.transferToImageBitmap();
	}
}

class AnswerCanvas extends AbstractKanjiTestCanvas {
	/**
	 * 読み問題の解答を1問描画するメソッド。drawSingleAnswerから呼び出される。
	 * @param questionData
	 * @param questionStartPoint
	 * @param yomiganaFontSize
	 * @param x
	 * @param y
	 */
	private drawSingleReadingAnswer(
		questionData: SingleQuestionData,
		questionStartPoint: number,
		yomiganaFontSize: number,
		x: number,
		y: number,
	) {
		// 問題文のフォント高さの取得
		const questionFontData: FontData = {
			fontSize: this.modifyFontSize(questionData.fullText.length),
			fontFamily: this.fontFamily,
		};
		const questionCharHeight = this.charHeight.get(questionFontData);

		// 解答フォントデータの設定
		const answerFontData: FontData = {
			fontSize: this.modifyFontSize(
				questionData.targetKanji.length,
				y +
					questionCharHeight *
						(questionStartPoint + questionData.targetKanji.length) -
					(y + questionCharHeight * questionStartPoint),
				yomiganaFontSize,
			),
			fontFamily: this.fontFamily,
		};
		const answerMargin = 5;

		// よみがなの描画
		this.drawTategakiText(
			questionData.yomigana,
			x + questionCharHeight + answerMargin,
			y + questionCharHeight * questionStartPoint,
			answerFontData,
			"red",
		);
	}

	private drawSingleWritingAnswer(
		questionData: SingleQuestionData,
		questionStartPoint: number,
		defaultCharHeight: number,
		x: number,
		y: number,
	) {
		if (questionData.fullText.includes(questionData.targetKanji)) {
			// 問題文フォント高さの設定
			// 解答フォントデータは問題と同じ
			const questionFontData: FontData = {
				fontSize: this.modifyFontSize(
					questionData.fullText.length,
					this.maxHeight -
						defaultCharHeight * questionData.targetKanji.length * 2,
				),
				fontFamily: this.fontFamily,
			};
			const questionCharHeight = this.charHeight.get(questionFontData);
			this.setFontData(questionFontData);
			for (const [index, currentChar] of Array.from(
				questionData.targetKanji,
			).entries()) {
				this.ctx.fillStyle = "red";
				let charToBeDrawn = currentChar;
				if (currentChar === "ー") {
					charToBeDrawn = "❘";
				}
				this.ctx.fillText(
					charToBeDrawn,
					x,
					y +
						questionCharHeight * 2 * (index + 0.25) +
						questionCharHeight * questionStartPoint,
				);
			}
		}
	}

	/**
	 * 解答を1問描画するメソッド
	 * @param questionData
	 * @param x
	 * @param y
	 * @param fontData
	 * @param maxHeight
	 */
	private drawSingleAnswer(
		questionData: SingleQuestionData,
		x: number,
		y: number,
		fontData: FontData,
	) {
		this.setFontData(fontData);
		const defaultCharHeight = this.charHeight.get(fontData);
		const yomiganaFontSize = 18;
		const questionStartPoint = questionData.fullText.indexOf(
			questionData.targetKanji,
		);
		const newY = y + defaultCharHeight * 1.5; // Y値再設定（問題番号分空ける）

		if (
			questionData.fullText == null ||
			questionData.questionType == null ||
			questionData.targetKanji == null ||
			questionData.yomigana == null
		)
			return;

		if (questionData.questionType === "yomi") {
			this.drawSingleReadingAnswer(
				questionData,
				questionStartPoint,
				yomiganaFontSize,
				x,
				newY,
			);
		} else {
			this.drawSingleWritingAnswer(
				questionData,
				questionStartPoint,
				defaultCharHeight,
				x,
				newY,
			);
		}
	}

	public override draw(): ImageBitmap {
		for (const [
			index,
			questionData,
		] of this.allQuestionData.questions.entries()) {
			const x =
				index < 10
					? CANVAS_WIDTH - DEPLOYMENT_WIDTH * (index + 1)
					: CANVAS_WIDTH - DEPLOYMENT_WIDTH * (index - 10 + 1);
			const y = index < 10 ? 40 : 480;
			this.drawSingleAnswer(questionData, x, y, this.defaultFontData);
		}

		return this.canvas.transferToImageBitmap();
	}
}

class KanjiTest {
	private questionCanvas: QuestionCanvas;
	private answerCanvas: AnswerCanvas;

	constructor(charHeight: CharHeight, allQuestionData: AllQuestionData) {
		this.questionCanvas = new QuestionCanvas(charHeight, allQuestionData);
		this.answerCanvas = new AnswerCanvas(charHeight, allQuestionData);
	}

	public createImages() {
		return [this.questionCanvas.draw(), this.answerCanvas.draw()];
	}
}

console.debug("Web Worker起動");

const charHeight = new CharHeight();

const observable = fromEvent<MessageEvent<AllQuestionData>>(self, "message");
observable
	.pipe(
		switchMap((event) => {
			const task = new Promise<ImageBitmap[]>((resolve) => {
				console.debug("漢字テスト作成のタスクを開始します");
				const kanjiTest = new KanjiTest(charHeight, event.data);
				const resultImages = kanjiTest.createImages();
				resolve(resultImages);
			});
			return task;
		}),
	)
	.subscribe({
		next: (data) => {
			postMessage(data, [...data]);
			console.debug("漢字テスト作成のタスクが完了しました");
		},
		error: (err) => {
			console.error(err);
		},
	});
