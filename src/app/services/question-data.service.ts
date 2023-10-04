import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AllQuestionData } from "../shared/types/question-data";

@Injectable({
	providedIn: "root",
})
export class QuestionDataService {
	private subject = new Subject<AllQuestionData>();
	public questionDataObservable$ = this.subject.asObservable();

	sendQuestionData(msg: AllQuestionData) {
		this.subject.next(msg);
	}
}
