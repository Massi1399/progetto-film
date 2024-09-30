import { Component } from '@angular/core';
import { NameFieldComponent} from '../../formfields/namefield/namefield.component';
import {SurnameFieldComponent} from '../../formfields/surnamefield/surnamefield.component';
import { EmailFieldComponent } from '../../formfields/emailfield/emailfield.component';
import {ConfirmfieldComponent} from '../../formfields/confirmfield/confirmfield.component';
import { PasswordFieldComponent } from '../../formfields/passwordfield/passwordfield.component';
import {FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [NameFieldComponent, SurnameFieldComponent, EmailFieldComponent, PasswordFieldComponent, ConfirmfieldComponent, FormsModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,],
})

export class LoginComponent {

  passwordHint = "Almeno 8 caratteri, tra cui minuscole, maiuscole, numeri e caratteri speciali";
  passwordLabel = "Password";
  confirmLabel = "Conferma password";

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email,
                             this.loginForm.value.password
        ).subscribe({
          next: (response) => {
            //console.log('User logged', response);
            alert('Login avvenuto con successo!');
            this.router.navigate(['/myProfile']);
  
          },
          error: (error) => {
            //console.error('Error during login: ', error);
            if(error.status == 422 || error.status == 401)
               alert('Login fallito, email o password errati!');
            else alert('Login fallito, errore interno!');
        }
          
        });  
    }
  }
}

