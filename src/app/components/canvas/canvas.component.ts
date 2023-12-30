import { CommonModule, DOCUMENT } from "@angular/common";
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
	inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { QuestionDataService } from "src/app/services/question-data.service";
import { ScreenSizeService } from "src/app/services/screen-size.service";
import { getCurrentDateTimeString } from "src/app/shared/common";
import { ButtonComponent } from "../shared/button/button.component";
import { ContextMenuComponent } from "../shared/context-menu/context-menu.component";
import { MenuButtonComponent } from "../shared/menu-button/menu-button.component";
import { ToggleButtonComponent } from "../shared/toggle-button/toggle-button.component";

@Component({
	selector: "app-canvas",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ButtonComponent,
		ToggleButtonComponent,
		MenuButtonComponent,
		ContextMenuComponent,
	],
	templateUrl: "./canvas.component.html",
	styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
	@ViewChild("bgCanvas") private bgCanvas!: ElementRef<HTMLCanvasElement>;
	@ViewChild("questionCanvas")
	private questionCanvas!: ElementRef<HTMLCanvasElement>;
	@ViewChild("answerCanvas")
	private answerCanvas!: ElementRef<HTMLCanvasElement>;
	private document: Document = inject(DOCUMENT);
	private questionDataService = inject(QuestionDataService);
	private screenSizeService = inject(ScreenSizeService);
	private subscription: Subscription | undefined;
	private imageGeneratorWorker = new Worker(
		new URL("../../workers/image-generator.worker", import.meta.url),
	);
	isHiddenAnswerCanvas = false;
	contextMenu: MenuItem[] = [
		{
			label: "名前を付けて画像を保存",
			icon: "pi pi-image",
			command: () => {
				// TODO: ChromeとEdge以外ではshowSaveFilePickerが使えないので対応する
				this.isHiddenAnswerCanvas
					? this.saveQuestionImageWithName()
					: this.saveAnswerImageWithName();
			},
		},
		{
			label: "画像をコピー",
			icon: "pi pi-copy",
			command: () => {
				this.isHiddenAnswerCanvas
					? this.copyToClipboardQuestionImage()
					: this.copyToClipboardAnswerImage();
			},
		},
	];

	downloadMenu: MenuItem[] = [
		{
			label: "問題用紙",
			icon: "pi pi-download",
			command: () => {
				this.downloadQuestionImage();
			},
		},
		{
			label: "解答用紙",
			icon: "pi pi-download",
			command: () => {
				this.downloadAnswerImage();
			},
		},
	];

	isSmartPhone = false;
	private isSmartPhoneSubscription: Subscription;

	constructor() {
		this.isSmartPhoneSubscription =
			this.screenSizeService.isSmartPhoneObservable$.subscribe(
				(isSmartPhone) => {
					this.isSmartPhone = isSmartPhone;
				},
			);
	}

	ngAfterViewInit(): void {
		const ctx = this.bgCanvas.nativeElement.getContext("2d", { alpha: false });
		if (!ctx) throw new Error("CanvasのContext取得に失敗しました");
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 1200, 900);
		ctx.font = `20px "游明朝"`;
		ctx.fillStyle = "gray";
		ctx.fillText("漢字テストメーカー", 1000, 870);

		this.subscription =
			this.questionDataService.questionDataObservable$.subscribe((data) => {
				this.imageGeneratorWorker.postMessage(data);
			});

		this.imageGeneratorWorker.onmessage = (event) => {
			const questionImage: ImageBitmap = event.data[0];
			const answerImage: ImageBitmap = event.data[1];
			this.questionCanvas.nativeElement
				.getContext("bitmaprenderer")
				?.transferFromImageBitmap(questionImage);
			this.answerCanvas.nativeElement
				.getContext("bitmaprenderer")
				?.transferFromImageBitmap(answerImage);
		};
	}

	ngOnDestroy(): void {
		this.imageGeneratorWorker.terminate();
		this.subscription?.unsubscribe();
		this.isSmartPhoneSubscription.unsubscribe();
	}

	private concatCanvas(
		canvases: ElementRef<HTMLCanvasElement>[],
	): OffscreenCanvas {
		const canvas = new OffscreenCanvas(1200, 900);
		const ctx = canvas.getContext("2d");
		for (const writeCanvasRef of canvases) {
			ctx?.drawImage(writeCanvasRef.nativeElement, 0, 0);
		}
		return canvas;
	}

	private async createConcatCanvasBlob(
		canvases: ElementRef<HTMLCanvasElement>[],
	) {
		return await this.concatCanvas(canvases).convertToBlob();
	}

	private async donwloadCanvasImage(
		canvases: ElementRef<HTMLCanvasElement>[],
		imageTitle: string,
	) {
		const blob = await this.createConcatCanvasBlob(canvases);
		const downloadLink = this.document.createElement("a");
		downloadLink.download = imageTitle;
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
		URL.revokeObjectURL(downloadLink.href);
	}

	private async saveCanvasImageWithName(
		canvases: ElementRef<HTMLCanvasElement>[],
		imageTitle: string,
	) {
		const blob = await this.createConcatCanvasBlob(canvases);
		const opts: SaveFilePickerOptions = {
			suggestedName: imageTitle,
			types: [
				{
					description: "PNG file",
					accept: { "image/png": [".png"] },
				},
			],
		};
		try {
			const handle = await window.showSaveFilePicker(opts);
			const writable = await handle.createWritable();
			await writable.write(blob);
			await writable.close();
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				// ユーザが何もせずにピッカーを閉じたら何もしない
			} else {
				throw err;
			}
		}
	}

	async downloadQuestionImage() {
		await this.donwloadCanvasImage(
			[this.bgCanvas, this.questionCanvas],
			`漢字テスト_${getCurrentDateTimeString()}`,
		);
	}

	async downloadAnswerImage() {
		await this.donwloadCanvasImage(
			[this.bgCanvas, this.questionCanvas, this.answerCanvas],
			`漢字テスト解答_${getCurrentDateTimeString()}`,
		);
	}

	async saveQuestionImageWithName() {
		await this.saveCanvasImageWithName(
			[this.bgCanvas, this.questionCanvas],
			`漢字テスト_${getCurrentDateTimeString()}`,
		);
	}

	async saveAnswerImageWithName() {
		await this.saveCanvasImageWithName(
			[this.bgCanvas, this.questionCanvas, this.answerCanvas],
			`漢字テスト解答_${getCurrentDateTimeString()}`,
		);
	}

	async copyToClipboardQuestionImage() {
		navigator.clipboard.write([
			new ClipboardItem({
				"image/png": this.createConcatCanvasBlob([
					this.bgCanvas,
					this.questionCanvas,
				]),
			}),
		]);
	}

	async copyToClipboardAnswerImage() {
		navigator.clipboard.write([
			new ClipboardItem({
				"image/png": this.createConcatCanvasBlob([
					this.bgCanvas,
					this.questionCanvas,
					this.answerCanvas,
				]),
			}),
		]);
	}
}
