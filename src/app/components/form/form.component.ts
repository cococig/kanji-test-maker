import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	ReactiveFormsModule,
} from "@angular/forms";
import { filter } from "rxjs";
import { MessageService } from "src/app/services/message.service";
import { QuestionDataService } from "src/app/services/question-data.service";
import { getCurrentDateTimeString } from "src/app/shared/common";
import {
	AllQuestionData,
	isAllQuestionData,
} from "src/app/shared/types/question-data";
import { MenuButtonComponent } from "../shared/menu-button/menu-button.component";
import { SplitButtonComponent } from "../shared/split-button/split-button.component";
import { QuestionCardComponent } from "./question-card/question-card.component";
import { questionsFormArray } from "./shared/types/form-types";

function isIncludeTargetKanjiInFullText(questionGroup: AbstractControl) {
	const fullText: string | null = questionGroup.get("fullText")?.value;
	const targetKanji: string | null = questionGroup.get("targetKanji")?.value;
	return targetKanji == null || !fullText?.includes(targetKanji)
		? { notIncludeTargetKanjiInFullText: true }
		: null;
}

function maxLengthFullText(questionGroup: AbstractControl) {
	const fullText: string | null = questionGroup.get("fullText")?.value;
	const targetKanji: string | null = questionGroup.get("targetKanji")?.value;
	const questionType: string | null = questionGroup.get("questionType")?.value;
	const questionsLength = questionGroup.parent?.controls.length;
	if (
		typeof fullText !== "string" ||
		typeof targetKanji !== "string" ||
		typeof questionsLength !== "number"
	)
		return null;
	if (questionsLength <= 10) {
		if (
			(questionType === "yomi" && fullText.length > 29) ||
			(questionType === "kaki" && fullText.length > 29 - targetKanji.length * 2)
		) {
			return { maxLengthFullText: true };
		}
	} else if (questionsLength > 10) {
		if (
			(questionType === "yomi" && fullText.length > 13) ||
			(questionType === "kaki" && fullText.length > 13 - targetKanji.length * 2)
		) {
			return { maxLengthFullText: true };
		}
	}
	return null;
}

interface QuestionData {
	questions: {
		fullText: string;
		targetKanji: string;
		yomigana: string;
		questionType: "yomi" | "kaki";
	}[];
}

// biome-ignore lint/suspicious/noExplicitAny: 型ガード関数のためany型許容
function isQuestionDataList(data: any): data is QuestionData {
	if (data instanceof Object && !Array.isArray(data?.questions)) return false;
	for (const singleQuestionData of data.questions) {
		if (!(singleQuestionData instanceof Object)) return false;
		if (
			typeof singleQuestionData?.fullText !== "string" ||
			typeof singleQuestionData?.targetKanji !== "string" ||
			typeof singleQuestionData?.yomigana !== "string" ||
			(singleQuestionData?.questionType !== "yomi" &&
				singleQuestionData?.questionType !== "kaki")
		) {
			return false;
		}
	}
	return true;
}

@Component({
	selector: "app-form",
	standalone: true,
	imports: [
		CommonModule,
		QuestionCardComponent,
		ReactiveFormsModule,
		MenuButtonComponent,
		SplitButtonComponent,
	],
	templateUrl: "./form.component.html",
	styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
	private fb = inject(FormBuilder);
	private messageService = inject(MessageService);
	private questionDataService = inject(QuestionDataService);

	questionsForm = this.fb.group({
		questions: this.fb.array([
			this.fb.group(
				{
					fullText: [""],
					targetKanji: [""],
					yomigana: [""],
					questionType: ["kaki"],
				},
				{
					validators: [isIncludeTargetKanjiInFullText, maxLengthFullText],
				},
			),
		]),
	});

	addQuestionButtonItems: MenuItem[] = [
		{
			label: "5問追加",
			icon: "pi pi-plus",
			disabled: this.questions.length === 20,
			command: () => this.addQuestion(5),
		},
		{
			label: "20問追加",
			icon: "pi pi-plus",
			disabled: this.questions.length === 20,
			command: () => this.addQuestion(20),
		},
	];

	changeAllQuestionTypeButtonItems: MenuItem[] = [
		{
			label: "すべて書き問題に変更",
			command: () => this.changeAllQuestionType("kaki"),
		},
	];

	questionDataImportExportMenuItems: MenuItem[] = [
		{
			label: "エクスポート",
			icon: "pi pi-file-export",
			command: () => this.exportQuestionData(),
		},
		{
			label: "インポート",
			icon: "pi pi-file-import",
			command: () => this.importQuestionData(),
		},
	];

	smartPhoneMenuItems: MenuItem[] = [
		{
			label: "すべて読み問題に変更",
			command: () => this.changeAllQuestionType("yomi"),
		},
		{
			label: "すべて書き問題に変更",
			command: () => this.changeAllQuestionType("kaki"),
		},
		{
			label: "エクスポート",
			icon: "pi pi-file-export",
			command: () => this.exportQuestionData(),
		},
		{
			label: "インポート",
			icon: "pi pi-file-import",
			command: () => this.importQuestionData(),
		},
	];

	private document: Document = inject(DOCUMENT);

	ngOnInit(): void {
		this.questionsForm.valueChanges
			.pipe(filter((data) => isAllQuestionData(data)))
			.subscribe((data) => {
				console.debug("QuestionDataServiceにデータを送信します");
				this.questionDataService.sendQuestionData(data as AllQuestionData);
			});
	}

	get questions() {
		return this.questionsForm.get("questions") as questionsFormArray;
	}

	get isTrashDisabled() {
		return this.questionsForm.get("questions")?.value.length === 1;
	}

	/**
	 * 指定された数の問題を追加する。
	 * 20問より多く追加しようとしても何も起こらないようになっている。
	 * @param times 問題を追加したい数
	 */
	addQuestion(times: number) {
		Array.from({ length: times }, (_, k) => k).map(() => {
			if (this.questions.length < 20) {
				this.questions.push(
					this.fb.group(
						{
							fullText: [""],
							targetKanji: [""],
							yomigana: [""],
							questionType: ["kaki"],
						},
						{
							validators: [isIncludeTargetKanjiInFullText, maxLengthFullText],
						},
					),
				);
			}
		});
	}

	/**
	 * 指定されたインデックス番号の問題を削除する。
	 * 1問未満にはならないようになっている。
	 * @param index 問題のインデックス
	 */
	removeQuestion(index: number) {
		if (this.questions.length !== 1) this.questions.removeAt(index);
	}

	/**
	 * すべての問題の読み/書きを一括で変更
	 * @param questionType 読み/書きの指定
	 */
	changeAllQuestionType(questionType: "yomi" | "kaki") {
		const newQuestions = this.questions.value.map((question) => ({
			questionType,
		}));
		this.questions.patchValue(newQuestions);
	}

	/**
	 * 問題データのファイルへのエクスポート
	 */
	exportQuestionData() {
		const blob = new Blob([JSON.stringify(this.questionsForm.value)], {
			type: "application/json",
		});
		const downloadLink = this.document.createElement("a");
		downloadLink.download = `漢字テスト_${getCurrentDateTimeString()}`;
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
		URL.revokeObjectURL(downloadLink.href);
	}

	/**
	 * 問題データのファイルからのインポート
	 */
	importQuestionData() {
		const input = this.document.createElement("input");
		input.type = "file";
		input.accept = "application/json";
		input.addEventListener("change", () => {
			const fileList = input.files;
			if (fileList == null) return;
			const file = fileList[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				const rawFile = event.target?.result;
				if (rawFile == null || rawFile instanceof ArrayBuffer) return;
				console.debug("ファイルの読み込みに成功しました");
				const parsedFile = JSON.parse(rawFile);
				console.debug("ファイルのパースに成功しました");
				// データ形式のチェック
				if (!isQuestionDataList(parsedFile)) {
					console.debug("問題データが不正です");
					console.debug(parsedFile);
					this.messageService.showMessage(
						"問題データの形式が不正です",
						"error",
					);
					return;
				}
				console.debug("正しい問題データであることを確認しました");
				// 問題入力欄の個数の調整(インポートした問題数と現在の問題数が同じ場合は何もしない)
				const importedQuestionsLength = parsedFile.questions.length;
				const nowQuestionsLength = this.questions.length;
				if (nowQuestionsLength < importedQuestionsLength) {
					this.addQuestion(importedQuestionsLength - nowQuestionsLength);
				} else if (nowQuestionsLength > importedQuestionsLength) {
					for (
						let i = 0;
						i < nowQuestionsLength - importedQuestionsLength;
						i++
					) {
						this.removeQuestion(i);
					}
				}
				// データのフォームへの適用
				this.questionsForm.setValue(parsedFile);
				this.messageService.showMessage(
					"問題データの読み込みに成功しました",
					"success",
				);
			};
			console.debug("ファイルの読み込みを開始します");
			reader.readAsText(file, "UTF-8");
		});
		input.click();
	}
}
