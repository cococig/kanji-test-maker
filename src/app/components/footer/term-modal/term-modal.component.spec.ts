import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermModalComponent } from './term-modal.component';

describe('TermModalComponent', () => {
  let component: TermModalComponent;
  let fixture: ComponentFixture<TermModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TermModalComponent]
    });
    fixture = TestBed.createComponent(TermModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
