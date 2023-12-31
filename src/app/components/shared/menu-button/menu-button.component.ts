import { CommonModule } from "@angular/common";
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Input,
	ViewChild,
	inject,
} from "@angular/core";
import { ClickOutsideDirective } from "src/app/directives/click-outside.directive";
import { getRandomHTMLId } from "src/app/shared/common";

@Component({
	selector: "app-menu-button",
	standalone: true,
	imports: [CommonModule, ClickOutsideDirective],
	templateUrl: "./menu-button.component.html",
	styleUrl: "./menu-button.component.scss",
})
export class MenuButtonComponent implements AfterViewInit {
	@Input() label = "";
	@Input() icon = "";
	@Input() model: MenuItem[] = [];
	@ViewChild("menuElement") private menuElement!: ElementRef<HTMLUListElement>;

	protected inputId = getRandomHTMLId();
	protected isMenuOpen = false;
	protected isMenuOverflowX = false;
	protected isMenuOverflowY = false;

	private windowInnerWidth = window.innerWidth;
	private windowInnerHeight = window.innerHeight;
	private readonly menuItemHeight = 16 + 20; // padding + line-height
	private cd = inject(ChangeDetectorRef);

	ngAfterViewInit(): void {
		this.checkMenuOverflow();
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: Event) {
		this.windowInnerWidth = window.innerWidth;
		this.windowInnerHeight = this.windowInnerHeight;
	}

	clickInsideOrOutSide(isOutside: boolean) {
		if (isOutside) this.isMenuOpen = false;
	}

	toggleMenuOpen() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	menuItemClicked(event: MouseEvent, command?: (event: MouseEvent) => void) {
		if (command != null) command(event);
		this.isMenuOpen = false;
	}

	checkMenuOverflow() {
		const menuElementClientRect =
			this.menuElement.nativeElement.getBoundingClientRect();
		const menuElementRightPos = window.scrollX + menuElementClientRect.right;
		const menuElementBottomPos =
			window.scrollY +
			menuElementClientRect.bottom +
			this.menuItemHeight * this.model.length +
			2; // 最後の2はborder分
		this.isMenuOverflowX = menuElementRightPos > this.windowInnerWidth;
		this.isMenuOverflowY = menuElementBottomPos > this.windowInnerHeight;
		this.cd.detectChanges();
	}
}
