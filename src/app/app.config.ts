import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
	providers: [provideAnimations(), MessageService],
};
