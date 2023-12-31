import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalComponent } from "../../shared/modal/modal.component";

@Component({
	selector: "app-about-modal",
	standalone: true,
	imports: [CommonModule, ModalComponent],
	templateUrl: "./about-modal.component.html",
	styleUrls: ["./about-modal.component.scss"],
})
export class AboutModalComponent {
	@Input({ required: true }) visible!: boolean;
	@Output() visibleChange = new EventEmitter<boolean>();
}
