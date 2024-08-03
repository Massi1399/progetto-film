import {Component, Input} from '@angular/core';
/*import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';*/
import {FormControl, Validators,FormGroup ,FormsModule, ReactiveFormsModule} from '@angular/forms';



@Component({
  selector: 'password-field',
  templateUrl: './passwordfield.component.html',
  styleUrl: './passwordfield.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class PasswordFieldComponent {
  
  @Input()
  parentForm!: FormGroup;

  /*@Input() hint = '';
  @Input() label ='';

  hide = true;
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordErrorMessage = '';
  confirmPasswordErrorMessage = '';

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges, this.confirmPassword.statusChanges, this.confirmPassword.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  
  updateErrorMessage() {
    if (this.password.hasError('required') ) {
      this.passwordErrorMessage = 'Devi inserire una password!';
    } 
    else if (this.confirmPassword.hasError('required') ) {
      this.confirmPasswordErrorMessage = 'Devi inserire una password di conferma!';
    } 
    else if(this.password.hasError('minlength') ) {
       this.passwordErrorMessage = 'La password deve contenere almeno 8 caratteri!'; 
    }  
    else if(this.confirmPassword.hasError('minlength') ) {
        this.confirmPasswordErrorMessage = 'La password deve contenere almeno 8 caratteri!';
    }
    else if (this.password !== this.confirmPassword) {
      this.confirmPasswordErrorMessage = 'Le password non corrispondono!';
    }else {
      this.passwordErrorMessage = '';
      this.confirmPasswordErrorMessage = '';
    }
  }*/

}
