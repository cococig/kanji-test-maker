import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";
import { HeaderComponent } from "src/app/components/header/header.component";
import { CanvasComponent } from "./components/canvas/canvas.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormComponent } from "./components/form/form.component";
import { ToastComponent } from "./components/shared/toast/toast.component";
import { ScreenSizeService } from "./services/screen-size.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		FormComponent,
		CanvasComponent,
		FooterComponent,
		ToastComponent,
	],
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
	title = "kanji-test-generator";
	isSmartPhone = false;
	private isSmartPhoneSubscription: Subscription;

	constructor(private screenSizeService: ScreenSizeService) {
		this.isSmartPhoneSubscription =
			this.screenSizeService.isSmartPhoneObservable$.subscribe(
				(isSmartPhone) => {
					this.isSmartPhone = isSmartPhone;
				},
			);
	}

	ngOnDestroy(): void {
		this.isSmartPhoneSubscription.unsubscribe();
	}
}
