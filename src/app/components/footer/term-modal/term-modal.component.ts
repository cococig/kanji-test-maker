import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-term-modal",
	standalone: true,
	imports: [CommonModule, DialogModule],
	templateUrl: "./term-modal.component.html",
	styleUrls: ["./term-modal.component.scss"],
})
export class TermModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
