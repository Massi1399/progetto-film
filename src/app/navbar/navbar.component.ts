import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropdownMenuUserComponent } from "./dropdown-menu-user/dropdown-menu-user.component";
import { DropdownMenuCatalogComponent } from "./dropdown-menu-catalog/dropdown-menu-catalog.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DropdownMenuCatalogComponent, DropdownMenuUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogged = true; // Variable to check if the user is logged in
  isHomepage = true; // Variable to check if the current page is the homepage
  
}
