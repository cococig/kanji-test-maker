import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ScreenSizeService {
	private screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);
	screenWidthObservable$ = this.screenWidthSubject.asObservable();
	private isSmartPhoneSubject = new BehaviorSubject<boolean>(false);
	isSmartPhoneObservable$ = this.isSmartPhoneSubject.asObservable();

	constructor() {
		window.addEventListener("resize", () => {
			this.screenWidthSubject.next(window.innerWidth);
			this.updateIsSmartPhone();
		});
		this.updateIsSmartPhone();
	}

	private updateIsSmartPhone() {
		const screenWidth = this.screenWidthSubject.value;
		const isSmartPhone = screenWidth <= 768;
		this.isSmartPhoneSubject.next(isSmartPhone);
	}
}
