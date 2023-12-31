import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-toggle-button",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./toggle-button.component.html",
	styleUrl: "./toggle-button.component.scss",
})
export class ToggleButtonComponent {
	@Input() onLabel = "";
	@Input() offLabel = "";
	@Input() value = false;
	@Output() valueChange = new EventEmitter<boolean>();

	toggle(event: Event) {
		this.valueChange.emit((event.target as HTMLInputElement).checked);
	}
}
