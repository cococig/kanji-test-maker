import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageModalComponent } from './usage-modal.component';

describe('UsageModalComponent', () => {
  let component: UsageModalComponent;
  let fixture: ComponentFixture<UsageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsageModalComponent]
    });
    fixture = TestBed.createComponent(UsageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
