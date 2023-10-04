import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-update-history-modal",
	standalone: true,
	imports: [CommonModule, DialogModule],
	templateUrl: "./update-history-modal.component.html",
	styleUrls: ["./update-history-modal.component.scss"],
})
export class UpdateHistoryModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
