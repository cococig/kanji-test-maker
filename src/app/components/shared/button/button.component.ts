import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "app-button",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent implements OnInit {
	@Input() label = "";
	@Input() icon = "";
	@Input() disabled = false;
	@Input() isOutlined = false;
	@Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	isIconOnly = false;

	ngOnInit(): void {
		this.isIconOnly = !this.label && Boolean(this.icon);
	}
}
