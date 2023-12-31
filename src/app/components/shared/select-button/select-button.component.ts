import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "app-select-button",
	standalone: true,
	imports: [CommonModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectButtonComponent),
			multi: true,
		},
	],
	templateUrl: "./select-button.component.html",
	styleUrl: "./select-button.component.scss",
})
export class SelectButtonComponent implements ControlValueAccessor, OnInit {
	@Input({ required: true }) options: SelectButtonOption[] = [];
	@Input() disabled = false;

	inputName = crypto.randomUUID();

	value: unknown;
	onModelChange: AnyFunction = () => {};
	onModelTouched: AnyFunction = () => {};

	ngOnInit(): void {
		this.value = this.options[0].value;
	}

	writeValue(value: unknown): void {
		this.value = value;
	}

	registerOnChange(fn: AnyFunction): void {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: AnyFunction): void {
		this.onModelTouched = fn;
	}

	updateValue(newValue: unknown): void {
		this.value = newValue;
		this.onModelChange(this.value);
		this.onModelTouched();
	}
}
