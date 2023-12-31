import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHistoryModalComponent } from './update-history-modal.component';

describe('UpdateHistoryModalComponent', () => {
  let component: UpdateHistoryModalComponent;
  let fixture: ComponentFixture<UpdateHistoryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateHistoryModalComponent]
    });
    fixture = TestBed.createComponent(UpdateHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
