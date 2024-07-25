import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuCatalogComponent } from './dropdown-menu-catalog.component';

describe('DropdownMenuCatalogComponent', () => {
  let component: DropdownMenuCatalogComponent;
  let fixture: ComponentFixture<DropdownMenuCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownMenuCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
