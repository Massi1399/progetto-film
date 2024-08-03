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
  selector: 'confirm-field',
  standalone: true,
  templateUrl: './confirmfield.component.html',
  styleUrl: './confirmfield.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class ConfirmfieldComponent {

  @Input()
  parentForm!: FormGroup;
}
