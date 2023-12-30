import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ClickOutsideDirective } from "src/app/directives/click-outside.directive";
import { getRandomHTMLId } from "src/app/shared/common";

@Component({
	selector: "app-menu-button",
	standalone: true,
	imports: [CommonModule, ClickOutsideDirective],
	templateUrl: "./menu-button.component.html",
	styleUrl: "./menu-button.component.scss",
})
export class MenuButtonComponent {
	@Input() label = "";
	@Input() icon = "";
	@Input() model: MenuItem[] = [];

	protected inputId = getRandomHTMLId();
	protected isMenuClose = true;

	clickInsideOrOutSide(isOutside: boolean) {
		if (isOutside) this.isMenuClose = true;
	}

	toggleMenuOpen() {
		this.isMenuClose = !this.isMenuClose;
	}

	menuItemClicked(event: MouseEvent, command?: (event: MouseEvent) => void) {
		if (command != null) command(event);
		this.isMenuClose = true;
	}
}
