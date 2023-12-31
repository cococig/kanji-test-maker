import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteComponent } from "../../shared/auto-complete/auto-complete.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { SelectButtonComponent } from "../../shared/select-button/select-button.component";
import { questionFormGroup } from "../shared/types/form-types";

const KANJI_REGEX = /[\u4e00-\u9faf]+/g;

@Component({
	selector: "app-question-card",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ButtonComponent,
		SelectButtonComponent,
		AutoCompleteComponent,
	],
	templateUrl: "./question-card.component.html",
	styleUrls: ["./question-card.component.scss"],
})
export class QuestionCardComponent {
	@Input({ required: true }) index!: number;
	@Input({ required: true }) formGroup!: questionFormGroup;
	@Input({ required: true }) isTrashDisabled!: boolean;
	@Output() remove = new EventEmitter<number>();

	/**
	 * 「問題文」の連続した漢字のみを分割して配列にして返す。「問題の漢字」のオートコンプリートに使う。
	 *
	 * 例：「漢字をこのように分割して下さい」=>["漢字","分割","下"]
	 */
	get suggestionTargetKanji() {
		return this.formGroup.get("fullText")?.value?.match(KANJI_REGEX) ?? [];
	}
}
