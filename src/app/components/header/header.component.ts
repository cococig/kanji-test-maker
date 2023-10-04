import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { AboutModalComponent } from "./about-modal/about-modal.component";
import { UsageModalComponent } from "./usage-modal/usage-modal.component";
import { UpdateHistoryModalComponent } from "./update-history-modal/update-history-modal.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		CommonModule,
		DialogModule,
		ButtonModule,
		AboutModalComponent,
		UsageModalComponent,
		UpdateHistoryModalComponent,
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	visibleAboutModal = false;
	visibleUsageModal = false;
	visibleUpdateHistoryModal = false;

	showAboutModal() {
		this.visibleAboutModal = true;
	}

	showUsageModal() {
		this.visibleUsageModal = true;
	}

	showUpdateHistoryModal() {
		this.visibleUpdateHistoryModal = true;
	}
}
