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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.scss'],
  imports: [NameFieldComponent, SurnameFieldComponent, EmailFieldComponent, PasswordFieldComponent, ConfirmfieldComponent, FormsModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,],
})
export class ProfileComponent {
  profileForm: FormGroup;

  passwordHint = "Almeno 8 caratteri, tra cui minuscole, maiuscole, numeri e caratteri speciali";
  passwordLabel = "Password";
  confirmLabel = "Conferma password";

  
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, this.regexValidator(/^[a-zA-Z]+$/) ]],
      surname: ['', [Validators.required, this.regexValidator(/^[a-zA-Z]+$/) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.regexValidator(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  ngOnInit(): void {
    this.authService.userData().subscribe(
      (data) => {
        this.profileForm.patchValue({
          name: data.name,
          surname: data.surname,
          email: data.email
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
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
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.authService.register(this.profileForm.value.name,
                                this.profileForm.value.surname,
                                this.profileForm.value.email,
                                this.profileForm.value.password,
                                this.profileForm.value.confirmPassword
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

