import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule, MenuPositionX} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title User menu
 */

@Component({
  selector: 'navbar-dropdown-menu-user',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './dropdown-menu-user.component.html',
  styleUrl: './dropdown-menu-user.component.scss'
})
export class DropdownMenuUserComponent {
    isAdmin = true; // Variable to check if the user is an admin
    isEditor = false; // Variable to check if the user is an editor
    @Input()
    xPosition: MenuPositionX = "after";
}
