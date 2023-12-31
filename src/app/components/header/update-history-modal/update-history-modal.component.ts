import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
	selector: "app-update-history-modal",
	standalone: true,
	imports: [CommonModule, ModalComponent],
	templateUrl: "./update-history-modal.component.html",
	styleUrls: ["./update-history-modal.component.scss"],
})
export class UpdateHistoryModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
