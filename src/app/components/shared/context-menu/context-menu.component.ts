import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy } from "@angular/core";
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
	visible = false;
	posX = 0;
	posY = 0;
	private scrollListener?: (() => void) | null;

	showContextMenu(event: MouseEvent) {
		console.log("show context menu");
		event.preventDefault();
		this.posX = event.clientX;
		this.posY = event.clientY;
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
		console.log("onScroll");
		this.closeContextMenu();
	}

	private removeScrollListener() {
		if (this.scrollListener) {
			window.removeEventListener("scroll", this.scrollListener);
			this.scrollListener = null;
		}
	}

	ngOnDestroy(): void {
		this.removeScrollListener();
	}
}
