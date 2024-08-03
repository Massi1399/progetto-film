import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmfieldComponent } from './confirmfield.component';

describe('ConfirmfieldComponent', () => {
  let component: ConfirmfieldComponent;
  let fixture: ComponentFixture<ConfirmfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
