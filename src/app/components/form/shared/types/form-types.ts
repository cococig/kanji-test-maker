import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type questionFormGroup = FormGroup<{
	fullText: FormControl<string | null>;
	targetKanji: FormControl<string | null>;
	yomigana: FormControl<string | null>;
	questionType: FormControl<string | null>;
}>;

export type questionsFormArray = FormArray<questionFormGroup>;
