import { Component } from '@angular/core';
import { NameFieldComponent} from '../../formfields/namefield/namefield.component';
import {SurnameFieldComponent} from '../../formfields/surnamefield/surnamefield.component';
import { EmailFieldComponent } from '../../formfields/emailfield/emailfield.component';
import {ConfirmfieldComponent} from '../../formfields/confirmfield/confirmfield.component';
import { PasswordFieldComponent } from '../../formfields/passwordfield/passwordfield.component';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: true,
  imports: [NameFieldComponent, SurnameFieldComponent, EmailFieldComponent, PasswordFieldComponent, ConfirmfieldComponent, FormsModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,],
  //providers: [{provide: MatFormFieldControl, useExisting: RegistrationComponent}],
})

export class RegistrationComponent {

  passwordHint = "Almeno 8 caratteri, tra cui minuscole, maiuscole, numeri e caratteri speciali";
  passwordLabel = "Password";
  confirmLabel = "Conferma password";

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, this.regexValidator(/^[a-zA-Z]+$/) ]],
      surname: ['', [Validators.required, this.regexValidator(/^[a-zA-Z]+$/) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.regexValidator(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }
  
  matchValues(matchTo: string): (control: AbstractControl) => { [key: string]: boolean } | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const FormGroup = control.parent as FormGroup;
      if (FormGroup) {
        const matchingControl = FormGroup.controls[matchTo];
        if (matchingControl && control.value !== matchingControl.value) {
          return { isMatching: true };
        }
      } 
      return null;
    };
  }

  regexValidator(pattern: RegExp): (control: AbstractControl) => { [key: string]: boolean } | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const valid = pattern.test(control.value);
      return valid ? null : { regexInvalid: true };
    };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authService.register(this.registrationForm.value.name,
                                this.registrationForm.value.surname,
                                this.registrationForm.value.email,
                                this.registrationForm.value.password,
                                this.registrationForm.value.confirmPassword
      ).subscribe({
        next: (response) => {
          //console.log('User registered', response);
          alert('Registrazione avvenuta con successo!');
          this.router.navigate(['/login']);

        },
        error: (error) => {
          //console.error('Error during registration: ', error);
          if(error.status == 401)
            alert('Registrazione fallita, ricontrolla i dati inseriti!');
          else alert('Registrazione fallita, errore interno!');

      }
        
      });  
    }
  }
}

