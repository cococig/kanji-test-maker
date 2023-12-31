import { CommonModule } from "@angular/common";
import {
	Component,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	ViewChild,
} from "@angular/core";
import { ClickOutsideDirective } from "src/app/directives/click-outside.directive";

@Component({
	selector: "app-context-menu",
	standalone: true,
	imports: [CommonModule, ClickOutsideDirective],
	templateUrl: "./context-menu.component.html",
	styleUrl: "./context-menu.component.scss",
})
export class ContextMenuComponent implements OnDestroy {
	@Input() model: MenuItem[] = [];
	@ViewChild("contextMenuElement")
	private contextMenuElement!: ElementRef<HTMLDivElement>;
	visible = false;
	posX = 0;
	posY = 0;
	left = `${this.posY}px`;
	private scrollListener?: (() => void) | null;
	private isMenuOverflowX = false;

	private windowInnerWidth = window.innerWidth;

	@HostListener("window:resize", ["$event"])
	onResize(event: Event) {
		this.windowInnerWidth = window.innerWidth;
	}

	showContextMenu(event: MouseEvent) {
		event.preventDefault();
		this.posX = event.clientX;
		this.posY = event.clientY;
		this.checkMenuOverflow();
		this.left = this.isMenuOverflowX
			? `${this.posX - this.contextMenuElement.nativeElement.offsetWidth}px`
			: `${this.posX}px`;
		this.visible = true;

		this.scrollListener = this.onScroll.bind(this);
		window.addEventListener("scroll", this.scrollListener);
	}

	closeContextMenu() {
		this.posX = 0;
		this.posY = 0;
		this.visible = false;
		this.removeScrollListener();
	}

	menuItemClicked(event: MouseEvent, command?: (event: MouseEvent) => void) {
		if (command != null) command(event);
		this.closeContextMenu();
	}

	onClickInsideOrOutside(isOutside: boolean) {
		if (this.visible && isOutside) {
			this.closeContextMenu();
		}
	}

	private onScroll() {
		this.closeContextMenu();
	}

	private removeScrollListener() {
		if (this.scrollListener) {
			window.removeEventListener("scroll", this.scrollListener);
			this.scrollListener = null;
		}
	}

	private checkMenuOverflow() {
		const contextMenuElementRightPos =
			this.posX + this.contextMenuElement.nativeElement.offsetWidth;
		this.isMenuOverflowX = contextMenuElementRightPos > this.windowInnerWidth;
	}

	ngOnDestroy(): void {
		this.removeScrollListener();
	}
}
