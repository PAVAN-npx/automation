import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseExecutionComponent } from './testcase-execution.component';

describe('TestcaseExecutionComponent', () => {
  let component: TestcaseExecutionComponent;
  let fixture: ComponentFixture<TestcaseExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcaseExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcaseExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
