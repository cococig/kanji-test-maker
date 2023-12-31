import { TestBed } from '@angular/core/testing';

import { QuestionDataService } from './question-data.service';

describe('QuestionDataService', () => {
  let service: QuestionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
