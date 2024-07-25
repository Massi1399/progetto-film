import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Catalog menu
 */
@Component({
  selector: 'navbar-dropdown-menu-catalog',
  templateUrl: 'dropdown-menu-catalog.component.html',
  styleUrl: 'dropdown-menu-catalog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
})
export class DropdownMenuCatalogComponent {}
