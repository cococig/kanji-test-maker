import { CommonModule } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";

import { ScreenSizeService } from "src/app/services/screen-size.service";
import { ButtonComponent } from "../shared/button/button.component";
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
	],
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnDestroy {
	visibleAboutModal = false;
	visibleUsageModal = false;
	visibleUpdateHistoryModal = false;

	private screenSizeService = inject(ScreenSizeService);

	isSmartPhone = false;
	private isSmartPhoneSubscription =
		this.screenSizeService.isSmartPhoneObservable$.subscribe((isSmartPhone) => {
			this.isSmartPhone = isSmartPhone;
		});
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

	ngOnDestroy(): void {
		this.isSmartPhoneSubscription.unsubscribe();
	}

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
