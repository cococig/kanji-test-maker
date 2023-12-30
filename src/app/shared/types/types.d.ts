type MenuItem = {
	label?: string;
	icon?: string;
	disabled?: boolean;
	command?: (event: MouseEvent) => void;
};

type SelectButtonOption = {
	label: string;
	value: unknown;
};

type AnyFunction = (...args: unknown[]) => unknown;

type HTMLInputTypes =
	| "button"
	| "checkbox"
	| "color"
	| "date"
	| "datetime-local"
	| "email"
	| "file"
	| "hidden"
	| "image"
	| "month"
	| "number"
	| "password"
	| "radio"
	| "range"
	| "reset"
	| "search"
	| "submit"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week";

type Message = {
	message: string;
	type: "success" | "error" | "warning";
	duration: number;
};
