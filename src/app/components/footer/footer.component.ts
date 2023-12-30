import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { PrivacyPolicyModalComponent } from "./privacy-policy-modal/privacy-policy-modal.component";
import { TermModalComponent } from "./term-modal/term-modal.component";

@Component({
	selector: "app-footer",
	standalone: true,
	imports: [CommonModule, PrivacyPolicyModalComponent, TermModalComponent],
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
	readonly nowYear = new Date().getFullYear();
	visiblePrivacyPolicyModal = false;
	visibleTermModal = false;

	showPrivacyPolicyModal() {
		this.visiblePrivacyPolicyModal = true;
	}

	showTermModal() {
		this.visibleTermModal = true;
	}
}
