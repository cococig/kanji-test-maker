import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuButtonComponent } from "./menu-button.component";

describe("SelectButtonComponent", () => {
	let component: MenuButtonComponent;
	let fixture: ComponentFixture<MenuButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MenuButtonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
