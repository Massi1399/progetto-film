import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, NavigationEnd } from '@angular/router';
import { CatalogComponent } from '../catalog/catalog.component';
import { routes } from '../app.routes';

interface Option {
  name: string;
  value: string;
}

/**
 * @title Searchbar Component
 */
@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.component.html',
  styleUrls: ['searchbar.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
})
export class SearchbarComponent {
  options: Option[] = [
    {name: 'Titolo' , value: 'title'},
    {name: 'Genere' ,value: 'genre'},
    {name: 'Regista', value: 'director'},
    {name: 'Anno', value: 'productionYear'},

  ];
  selectedOption = this.options[0].value; // Default value 

  constructor(private router : Router) {}

  retrieveMovies(filterText: string , filterType : string) {
    this.router.navigate(['/catalog', {filterText: filterText, filterType: filterType}]);
  }

  inputValue = "";
  
}
