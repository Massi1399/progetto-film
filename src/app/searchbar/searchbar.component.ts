import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Option {
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
    {value: 'Titolo'},
    {value: 'Genere'},
    {value: 'Regista'},
    {value: 'Anno'},

  ];
  selectedOption = this.options[0].value; // Default value Titolo 

  inputValue = "";
  /*selectCar(event: Event) {
    this.selectedCar = (event.target as HTMLSelectElement).value;
  }*/
}
