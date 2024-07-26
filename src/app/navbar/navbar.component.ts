import { Component, Inject, Output, EventEmitter, OnInit  } from '@angular/core';
import { DropdownMenuUserComponent } from "./dropdown-menu-user/dropdown-menu-user.component";
import { DropdownMenuCatalogComponent } from "./dropdown-menu-catalog/dropdown-menu-catalog.component";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DropdownMenuCatalogComponent, DropdownMenuUserComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogged = true; // Variable to check if the user is logged in
  isHomepage: boolean = true; // Variable to check if the current page is the homepage
  isMenuCollapsed: boolean = true;
 
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomepage = this.router.url == '/';
      }
    });
  }
  
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
