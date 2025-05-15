import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  email = '';

  form = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (!this.email) {
        alert('Email missing!');
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  resetPassword() {
    const newPassword = this.form.get('newPassword')?.value;
    if (!newPassword) return;

    this.authService.resetPassword(this.email, newPassword).subscribe(() => {
      alert('Password reset successfully!');
      this.router.navigate(['/login']);
    }, err => {
      alert('Failed to reset password.');
    });
  }
}
