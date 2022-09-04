import { createCanvas, CanvasRenderingContext2D } from "canvas";
import { FontList, getGoogleFont } from "./fonts";

//問題数<=10の場合1段組
//10<問題数<=20の場合2段組
//問題を受け取って画像を出力する関数createImage()
//問題文をチェックするvalidateQuestion()

// NOTE:https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/font
// NOTE:https://developer.mozilla.org/en-US/docs/Web/API/FontFace

let fontFamily = "";

const QUESTION_NUMBER = [
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

const drawWaterMark = (ctx: CanvasRenderingContext2D) => {
  ctx.font = `20px "${fontFamily}"`;
  ctx.fillStyle = "gray";
  ctx.fillText("漢字テストメーカー", 1100, 870);
};

// 文章を縦書きする関数
const tategaki = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fontColor = "black",
) => {
  ctx.font = `${fontSize}px "${fontFamily}"`;
  const lineHeight = ctx.measureText("あ").width;
  Array.prototype.forEach.call(text, function (ch, i) {
    let punctuationFlag: boolean = false; // 句読点かどうかのフラグ
    ctx.fillStyle = fontColor;
    // 長音記号の場合は❘(0xED9298)に置き換え
    if (ch === "ー") {
      ch = "❘";
    }
    // 句読点の場合は右に半文字、上に半文字分表示をずらす。
    if (ch === "、" || ch === "。") {
      x += lineHeight / 2;
      y -= lineHeight / 2;
      punctuationFlag = true;
    }
    ctx.fillText(ch, x, y + lineHeight * i); // 文字を描画（y値は現在の文字数分下にずらす）
    // 句読点を表示した後、x,y値がずれるので元に戻す
    if (punctuationFlag) {
      x -= lineHeight / 2;
      y += lineHeight / 2;
    }
  });
  const endHeight = y + lineHeight * text.length;
  return endHeight;
};

// 文字サイズの自動調節関数
const modifyFontSize = (
  ctx: CanvasRenderingContext2D,
  textLength: number,
  maxHeight: number,
  defaultFontSize = 27,
) => {
  let nowFontSize = defaultFontSize;
  ctx.font = `${defaultFontSize}px "${fontFamily}"`;
  let lineHeight = ctx.measureText("あ").width;
  while (textLength * lineHeight > maxHeight) {
    nowFontSize -= 1;
    ctx.font = `${nowFontSize}px "${fontFamily}"`;
    lineHeight = ctx.measureText("あ").width;
  }
  return nowFontSize;
};

// 書き問題用の箱を描画する関数
const drawWriteBox = (
  ctx: CanvasRenderingContext2D,
  yomigana: string,
  lineHeight: number,
  questionLength: number,
  x: number,
  y: number,
) => {
  const yomiganaMargin = 15;
  const yomiganaFontSize = 18;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  // ボックスの描画
  ctx.rect(x - lineHeight, y, lineHeight * 2, lineHeight * questionLength * 2);
  ctx.fill();
  ctx.stroke();
  // 1文字ごとのラインの描画
  if (questionLength > 1) {
    for (let i = 0; i < questionLength - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(x - lineHeight, y + lineHeight * (i + 1) * 2);
      ctx.lineTo(x + lineHeight, y + lineHeight * (i + 1) * 2);
      ctx.stroke();
    }
  }
  // よみがな描画開始高さの設定
  const boxHalfHeight = y + lineHeight * questionLength; // ボックスの真ん中の高さ
  ctx.font = `${yomiganaFontSize}px "${fontFamily}"`;
  const yomiganaLineHeight = ctx.measureText("あ").width;
  const yomiganaHalfHeight = (yomigana.length * yomiganaLineHeight) / 2; // よみがなの高さの半分
  const yomiganaStartHeight = boxHalfHeight - yomiganaHalfHeight;

  // よみがなの描画
  tategaki(ctx, yomigana, x + lineHeight + yomiganaMargin, yomiganaStartHeight, yomiganaFontSize);

  const endHeight = y + lineHeight * questionLength * 2;
  return endHeight;
};

// 問題を描画する関数
const drawQuestion = (
  ctx: CanvasRenderingContext2D,
  questionNumber: number,
  text: string,
  question: string,
  yomigana: string,
  yomikaki: boolean,
  x: number,
  y: number,
  maxHeight: number,
) => {
  // 基本設定
  ctx.font = `27px "${fontFamily}"`;
  const defaultLineHeight = ctx.measureText("あ").width;
  ctx.fillStyle = "black";
  // 問題番号の描画
  ctx.fillText(QUESTION_NUMBER[questionNumber], x, y);
  // y値再設定（問題番号分空ける）
  y = y + defaultLineHeight * 1.5;

  // 読み問題
  if (yomikaki === false) {
    // フォントサイズの設定
    const fontSize = modifyFontSize(ctx, text.length, maxHeight);
    ctx.font = `${fontSize}px "${fontFamily}"`;
    const lineHeight = ctx.measureText("あ").width;

    // 問題の描画
    tategaki(ctx, text, x, y, fontSize);

    // 問題箇所の線の描画
    const start = text.indexOf(question);
    const margin = 5;
    ctx.beginPath();
    ctx.moveTo(x + lineHeight / 2 + margin, y + lineHeight * start);
    ctx.lineTo(x + lineHeight / 2 + margin, y + lineHeight * (start + question.length));
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    // 書き問題
  } else {
    const fontSize = modifyFontSize(
      ctx,
      text.length - question.length,
      maxHeight - defaultLineHeight * question.length * 2,
    );
    const start = text.indexOf(question);
    if (start === 0) {
      const endHeight = drawWriteBox(ctx, yomigana, defaultLineHeight, question.length, x, y);
      tategaki(ctx, text.replace(question, ""), x, endHeight, fontSize);
    } else {
      const strExceptQuestion = text.split(question);
      let endHeight = tategaki(ctx, strExceptQuestion[0], x, y, fontSize);
      endHeight = drawWriteBox(ctx, yomigana, defaultLineHeight, question.length, x, endHeight);
      tategaki(ctx, strExceptQuestion[1], x, endHeight, fontSize);
    }
  }
};

//答えを描画する関数
const drawAnswer = (
  ctx: CanvasRenderingContext2D,
  questionNumber: number,
  text: string,
  question: string,
  yomigana: string,
  yomikaki: boolean,
  x: number,
  y: number,
  maxHeight: number,
) => {
  // 基本設定
  ctx.font = `27px "${fontFamily}"`;
  const defaultLineHeight = ctx.measureText("あ").width;
  const yomiganaFontSize = 18;
  const questionStartPoint = text.indexOf(question);
  // y値再設定（問題番号分空ける）
  y = y + defaultLineHeight * 1.5;
  // 読み問題
  if (yomikaki === false) {
    // 問題文フォントサイズの設定
    const questionFontSize = modifyFontSize(ctx, text.length, maxHeight);
    ctx.font = `${questionFontSize}px "${fontFamily}"`;
    const questionLineHeight = ctx.measureText("あ").width;
    // 解答フォントサイズの設定
    const answerFontSize = modifyFontSize(
      ctx,
      question.length,
      y +
        questionLineHeight * (questionStartPoint + question.length) -
        (y + questionLineHeight * questionStartPoint),
      yomiganaFontSize,
    );
    ctx.font = `${answerFontSize}px "${fontFamily}"`;
    const answerMargin = 5;
    // よみがなの描画
    tategaki(
      ctx,
      yomigana,
      x + questionLineHeight + answerMargin,
      y + questionLineHeight * questionStartPoint,
      answerFontSize,
      "red",
    );
    // 書き問題
  } else {
    // 問題文フォントサイズの設定
    // 解答フォントサイズは問題と同じ
    const fontSize = modifyFontSize(
      ctx,
      text.length - question.length,
      maxHeight - defaultLineHeight * question.length * 2,
    );
    ctx.font = `${fontSize}px "${fontFamily}"`;
    const lineHeight = ctx.measureText("あ").width;
    Array.prototype.forEach.call(question, function (ch, i) {
      ctx.fillStyle = "red";
      if (ch === "ー") {
        ch = "❘";
      }
      ctx.fillText(ch, x, y + lineHeight * 2 * (i + 0.25) + lineHeight * questionStartPoint);
    });
  }
};

export async function createImage(data: QuestionData) {
  const ua = window.navigator.userAgent.toLowerCase(); // UAを取得
  if (ua.indexOf("windows nt") !== -1) {
    // windowsの場合、フォントを游明朝に設定
    fontFamily = FontList.default;
  } else {
    // それ以外はGoogle Fontを取得

    // 画像中で使用するフォントを列挙
    let allQuestionsText = "漢字テストメーカー";
    allQuestionsText += QUESTION_NUMBER.join("");
    for (const examFormData of data.examForm) {
      allQuestionsText += examFormData.all + examFormData.yomigana;
    }
    let text = Array.from(new Set(Array.from(allQuestionsText))).join(""); // 重複した文字の削除

    // フォントの取得
    fontFamily = FontList.notoSerif;
    await getGoogleFont(fontFamily, text);
  }
  const canvas = createCanvas(1200, 900);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await document.fonts.ready;
  ctx.font = `27px "${fontFamily}"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const maxHeight = data.examForm.length < 10 ? 800 : 360;
  const DEPLOYMENT_WIDTH = 109;
  data.examForm.forEach((questionData, index) => {
    const x =
      index < 10
        ? canvas.width - DEPLOYMENT_WIDTH * (index + 1)
        : canvas.width - DEPLOYMENT_WIDTH * (index - 10 + 1);
    const y = index < 10 ? 40 : 480;
    drawQuestion(
      ctx,
      index,
      questionData.all,
      questionData.question,
      questionData.yomigana,
      questionData.yomikaki,
      x,
      y,
      maxHeight,
    );
  });
  if (data.examForm.length > 10) {
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  drawWaterMark(ctx);
  const questionImage = canvas.toDataURL("image/png");
  data.examForm.forEach((questionData, index) => {
    const x =
      index < 10
        ? canvas.width - DEPLOYMENT_WIDTH * (index + 1)
        : canvas.width - DEPLOYMENT_WIDTH * (index - 10 + 1);
    const y = index < 10 ? 40 : 480;
    drawAnswer(
      ctx,
      index,
      questionData.all,
      questionData.question,
      questionData.yomigana,
      questionData.yomikaki,
      x,
      y,
      maxHeight,
    );
  });
  const answerImage = canvas.toDataURL("image/png");
  return [questionImage, answerImage];
}
