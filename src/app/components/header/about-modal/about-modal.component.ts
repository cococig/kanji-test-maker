import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";

@Component({
	selector: "app-about-modal",
	standalone: true,
	imports: [CommonModule, DialogModule],
	templateUrl: "./about-modal.component.html",
	styleUrls: ["./about-modal.component.scss"],
})
export class AboutModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
