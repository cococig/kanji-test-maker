import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-usage-modal",
	standalone: true,
	imports: [CommonModule, DialogModule],
	templateUrl: "./usage-modal.component.html",
	styleUrls: ["./usage-modal.component.scss"],
})
export class UsageModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
