import { Component } from '@angular/core';
import { NameFieldComponent} from '../../formfields/namefield/namefield.component';
import {SurnameFieldComponent} from '../../formfields/surnamefield/surnamefield.component';
import { EmailFieldComponent } from '../../formfields/emailfield/emailfield.component';
import {ConfirmfieldComponent} from '../../formfields/confirmfield/confirmfield.component';
import { PasswordFieldComponent } from '../../formfields/passwordfield/passwordfield.component';
import {FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: true,
  imports: [NameFieldComponent, SurnameFieldComponent, EmailFieldComponent, PasswordFieldComponent, ConfirmfieldComponent, FormsModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,],
  providers: [{provide: MatFormFieldControl, useExisting: RegistrationComponent}],
})

export class RegistrationComponent {

  passwordHint = "Almeno 8 caratteri, tra cui minuscole, maiuscole, numeri e caratteri speciali";
  passwordLabel = "Password";
  confirmLabel = "Conferma password";

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

  
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Logica di registrazione
    }
  }
}

