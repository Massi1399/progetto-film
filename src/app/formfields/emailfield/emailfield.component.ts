import {Component, Input} from '@angular/core';
/*import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
*/
import {FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';


/** @title Email field with hints */
@Component({
  selector: 'email-field',
  templateUrl: './emailfield.component.html',
  styleUrl: './emailfield.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class EmailFieldComponent {
  @Input()
  parentForm!: FormGroup;

  /*email = new FormControl('', [Validators.required, Validators.email]);
  
  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Inserisci un indirizzo email!';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Indirizzo email non valido!';
    } else {
      this.errorMessage = '';
    }
  }*/
}