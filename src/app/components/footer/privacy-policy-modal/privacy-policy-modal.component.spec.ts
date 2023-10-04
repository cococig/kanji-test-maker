import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyModalComponent } from './privacy-policy-modal.component';

describe('PrivacyPolicyModalComponent', () => {
  let component: PrivacyPolicyModalComponent;
  let fixture: ComponentFixture<PrivacyPolicyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrivacyPolicyModalComponent]
    });
    fixture = TestBed.createComponent(PrivacyPolicyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
