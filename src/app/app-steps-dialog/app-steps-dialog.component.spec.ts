import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { AppStepsDialogComponent } from './app-steps-dialog.component';

describe('AppStepsDialogComponent', () => {
  let component: AppStepsDialogComponent;
  let fixture: ComponentFixture<AppStepsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStepsDialogComponent,MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStepsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
