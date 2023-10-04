import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { SelectButtonModule } from "primeng/selectbutton";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { questionFormGroup } from "../shared/types/form-types";
import { RippleModule } from "primeng/ripple";
import { AutoCompleteModule } from "primeng/autocomplete";

const KANJI_REGEX = /[\u4e00-\u9faf]+/g;

@Component({
	selector: "app-question-card",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RippleModule,
		CardModule,
		SelectButtonModule,
		ButtonModule,
		InputTextModule,
		AutoCompleteModule,
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
