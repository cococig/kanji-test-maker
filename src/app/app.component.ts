import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ImageModule } from "primeng/image";
import { HeaderComponent } from "src/app/components/header/header.component";
import { FormComponent } from "./components/form/form.component";
import { PrimeNGConfig } from "primeng/api";
import { FooterComponent } from "./components/footer/footer.component";
import { DividerModule } from "primeng/divider";
import { ToastModule } from "primeng/toast";
import { CanvasComponent } from "./components/canvas/canvas.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		CommonModule,
		ImageModule,
		HeaderComponent,
		FormComponent,
		CanvasComponent,
		FooterComponent,
		DividerModule,
		ToastModule,
	],
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "kanji-test-generator";

	constructor(private primengConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primengConfig.ripple = true;
	}
}
