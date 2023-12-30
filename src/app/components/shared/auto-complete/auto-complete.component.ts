import { CommonModule } from "@angular/common";
import { Component, Input, forwardRef } from "@angular/core";
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
	selector: "app-auto-complete",
	standalone: true,
	imports: [CommonModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AutoCompleteComponent),
			multi: true,
		},
	],
	templateUrl: "./auto-complete.component.html",
	styleUrl: "./auto-complete.component.scss",
})
export class AutoCompleteComponent implements ControlValueAccessor {
	@Input() id = "";
	@Input() type: HTMLInputTypes = "text";
	@Input() placeholder = "";
	@Input() suggestions: Array<unknown> = [];
	@Input() invalid = false;

	isFocus = false;

	value: unknown;
	onModelChange: AnyFunction = () => {};
	onModelTouched: AnyFunction = () => {};

	writeValue(obj: unknown): void {
		this.value = obj;
	}

	registerOnChange(fn: AnyFunction): void {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: AnyFunction): void {
		this.onModelTouched = fn;
	}

	updateValue(event: Event | MouseEvent | KeyboardEvent): void {
		this.value = (event.target as HTMLInputElement | HTMLButtonElement).value;
		this.onModelChange(this.value);
		this.onModelTouched();
	}

	onFocus(event: FocusEvent) {
		if (event.type === "focus") {
			this.isFocus = true;
		} else if (event.type === "blur") {
			this.isFocus = false;
		}
	}
}
