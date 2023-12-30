import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output,
} from "@angular/core";

// SEE: https://zenn.dev/yusuke_docha/articles/13bae3dcb0739c
@Directive({
	selector: "[clickOutside]",
	standalone: true,
})
export class ClickOutsideDirective {
	@Output() clickOutside = new EventEmitter();

	constructor(private elementRef: ElementRef) {}

	@HostListener("document:click", ["$event.target"])
	public onClick(target: EventTarget) {
		const clickedInside = this.elementRef.nativeElement.contains(target);
		if (!clickedInside) {
			// 内側
			this.clickOutside.emit(true);
		} else {
			// 外側
			this.clickOutside.emit(false);
		}
	}
}
