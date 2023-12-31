import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ClickOutsideDirective } from "src/app/directives/click-outside.directive";
import { getRandomHTMLId } from "src/app/shared/common";

@Component({
	selector: "app-split-button",
	standalone: true,
	imports: [CommonModule, ClickOutsideDirective],
	templateUrl: "./split-button.component.html",
	styleUrl: "./split-button.component.scss",
})
export class SplitButtonComponent {
	@Input() label = "";
	@Input() disabled = false;
	@Input() model: MenuItem[] = [];
	@Output() onClick = new EventEmitter<MouseEvent>();

	protected inputId = getRandomHTMLId();
	protected isMenuClose = true;

	clickInsideOrOutSide(isOutside: boolean) {
		if (isOutside) this.isMenuClose = true;
	}

	toggleMenuOpen() {
		this.isMenuClose = !this.isMenuClose;
	}
}
