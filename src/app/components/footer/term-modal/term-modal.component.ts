import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
	selector: "app-term-modal",
	standalone: true,
	imports: [CommonModule, ModalComponent],
	templateUrl: "./term-modal.component.html",
	styleUrls: ["./term-modal.component.scss"],
})
export class TermModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
