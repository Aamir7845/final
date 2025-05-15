import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  stage: 'email' | 'question' = 'email';
  securityQuestion = '';
  email = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    answer: ['', Validators.required]
  });

  submitEmail() {
    const emailValue = this.form.get('email')?.value;
    if (!emailValue) return;

    this.authService.getSecurityQuestion(emailValue).subscribe((res: any) => {
      this.securityQuestion = res.question;
      this.email = emailValue;
      this.stage = 'question';
    }, err => {
      alert('Email not found!');
    });
  }

  submitAnswer() {
    const answer = this.form.get('answer')?.value;
    if (!answer) return;

    this.authService.verifySecurityAnswer(this.email, answer).subscribe(() => {
      // Navigate to reset-password with email as query param
      this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
    }, err => {
      alert('Incorrect answer');
    });
  }
}
