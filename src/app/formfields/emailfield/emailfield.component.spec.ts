import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFieldComponent } from './emailfield.component';

describe('EmailfieldComponent', () => {
  let component: EmailFieldComponent;
  let fixture: ComponentFixture<EmailFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
