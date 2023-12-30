import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
	selector: "app-usage-modal",
	standalone: true,
	imports: [CommonModule, ModalComponent],
	templateUrl: "./usage-modal.component.html",
	styleUrls: ["./usage-modal.component.scss"],
})
export class UsageModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
