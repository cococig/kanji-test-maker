import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { ButtonComponent } from "../shared/button/button.component";
import { MenuButtonComponent } from "../shared/menu-button/menu-button.component";
import { AboutModalComponent } from "./about-modal/about-modal.component";
import { UpdateHistoryModalComponent } from "./update-history-modal/update-history-modal.component";
import { UsageModalComponent } from "./usage-modal/usage-modal.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		CommonModule,
		AboutModalComponent,
		UsageModalComponent,
		UpdateHistoryModalComponent,
		ButtonComponent,
		MenuButtonComponent,
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	visibleAboutModal = false;
	visibleUsageModal = false;
	visibleUpdateHistoryModal = false;

	smartPhoneMenuItems: MenuItem[] = [
		{
			label: "このサイトについて",
			command: () => {
				this.showAboutModal();
			},
		},
		{
			label: "つかいかた",
			command: () => {
				this.showUsageModal();
			},
		},
		{
			label: "更新履歴",
			command: () => {
				this.showUpdateHistoryModal();
			},
		},
	];

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
