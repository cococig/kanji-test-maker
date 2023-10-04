import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-privacy-policy-modal",
	standalone: true,
	imports: [CommonModule, DialogModule],
	templateUrl: "./privacy-policy-modal.component.html",
	styleUrls: ["./privacy-policy-modal.component.scss"],
})
export class PrivacyPolicyModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
