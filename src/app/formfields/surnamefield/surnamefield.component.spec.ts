import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurnameFieldComponent } from './surnamefield.component';

describe('SurnamefieldComponent', () => {
  let component: SurnameFieldComponent;
  let fixture: ComponentFixture<SurnameFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurnameFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurnameFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
