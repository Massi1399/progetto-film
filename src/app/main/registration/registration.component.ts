import { Component } from '@angular/core';
import { EmailFieldComponent } from '../../formfields/emailfield/emailfield.component';
import { PasswordFieldComponent } from '../../formfields/passwordfield/passwordfield.component';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: true,
  imports: [EmailFieldComponent, PasswordFieldComponent, FormsModule,
            MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  providers: [{provide: MatFormFieldControl, useExisting: RegistrationComponent}],
})

export class RegistrationComponent {

  passwordHint = "Almeno 8 caratteri, tra cui minuscole, maiuscole, numeri e caratteri speciali";
  passwordLabel = "Password";
  confirmLabel = "Conferma password";
}

