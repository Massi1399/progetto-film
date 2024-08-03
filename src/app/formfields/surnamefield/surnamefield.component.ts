import {Component, Input} from '@angular/core';
/*
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
*/
import {FormGroup ,FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'surname-field',
  standalone: true,
  templateUrl: './surnamefield.component.html',
  styleUrl: './surnamefield.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class SurnameFieldComponent {

  @Input()
  parentForm!: FormGroup;
}
