import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class MessageService {
	private messages: Subject<Message> = new Subject();

	getMessage(): Observable<Message> {
		return this.messages.asObservable();
	}

	showMessage(
		message: string,
		type: "success" | "error" | "warning",
		duration = 3000,
	) {
		this.messages.next({ message, type, duration });
		console.log(message);
	}
}
