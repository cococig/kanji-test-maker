import { CommonModule, DOCUMENT } from "@angular/common";
import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
	inject,
} from "@angular/core";
import { getRandomHTMLId } from "src/app/shared/common";

@Component({
	selector: "app-modal",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./modal.component.html",
	styleUrl: "./modal.component.scss",
})
export class ModalComponent implements OnChanges {
	@Input() visible = false;
	@Output() visibleChange = new EventEmitter<boolean>();
	@Input() header = "";

	@ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

	protected dialogContainerId = getRandomHTMLId();
	private document = inject(DOCUMENT);

	@HostListener("window:keydown.escape", ["$event"])
	onKeydownHandler(event: KeyboardEvent) {
		this.closeModal();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.dialog == null) return;
		// biome-ignore lint/complexity/useLiteralKeys: プロパティ 'visible' はインデックス シグネチャに基づいているため、['visible'] を使用してアクセスする必要があります。ts(4111)
		const changesVisible = changes["visible"];
		if (changesVisible) {
			if (changesVisible.currentValue === true) {
				this.dialog.nativeElement.showModal();
				this.document.body.style.overflow = "hidden";
				console.log(changesVisible);
			} else if (changesVisible.currentValue === false) {
				this.dialog.nativeElement.close();
				this.document.body.style.overflow = "";
				console.log("close");
			}
		}
	}

	closeModal() {
		this.visible = false;
		this.visibleChange.emit(false);
	}

	onDialogClick(event: MouseEvent) {
		if (
			(event.target as HTMLDialogElement).closest(
				`#${this.dialogContainerId}`,
			) === null
		) {
			this.closeModal();
		}
	}
}
