// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent {
//   formbuilder = inject(FormBuilder);
//   registerForm = this.formbuilder.group({
//     name: ['', [Validators.required]],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.minLength(5)]],
//   });
//   authService = inject(AuthService);
//   router = inject(Router);
//   register() {
//     let value = this.registerForm.value;
//     this.authService
//       .register(value.name!, value.email!, value.password!)
//       .subscribe((result) => {
//         alert('User registered');
//         this.router.navigateByUrl('/login');
//       });
//   }
// }


// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent {
//   formbuilder = inject(FormBuilder);
//   registerForm = this.formbuilder.group({
//     name: ['', [Validators.required]],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.minLength(5)]],
//   });
//   authService = inject(AuthService);
//   router = inject(Router);
//   register() {
//     let value = this.registerForm.value;
//     this.authService
//       .register(value.name!, value.email!, value.password!)
//       .subscribe((result) => {
//         alert('User registered');
//         this.router.navigateByUrl('/login');
//       });
//   }
// }





// import { Component, inject } from '@angular/core';
// import {
//   FormBuilder,
//   Validators,
//   ReactiveFormsModule,
//   AbstractControl,
//   ValidationErrors,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatInputModule,
//     MatFormFieldModule,
//     MatButtonModule,
//   ],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent {
//   formBuilder = inject(FormBuilder);
//   authService = inject(AuthService);
//   router = inject(Router);

//   registerForm = this.formBuilder.group(
//     {
//       name: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.pattern('^[A-Za-z ]+$'),
//         ],
//       ],
//       email: ['', [Validators.required, Validators.email]],
//       password: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern(
//             /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
//           ),
//         ],
//       ],
//       confirmPassword: ['', [Validators.required]],
//     },
//     { validators: this.passwordMatchValidator }
//   );

//   // Getters for safe template access
//   get name() {
//     return this.registerForm.get('name');
//   }

//   get email() {
//     return this.registerForm.get('email');
//   }

//   get password() {
//     return this.registerForm.get('password');
//   }

//   get confirmPassword() {
//     return this.registerForm.get('confirmPassword');
//   }

//   passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
//     const password = control.get('password')?.value;
//     const confirmPassword = control.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { passwordMismatch: true };
//   }

//   register() {
//     if (this.registerForm.invalid) {
//       alert('All fields must be valid and filled out.');
//       return;
//     }

//     const { name, email, password } = this.registerForm.value;
//     this.authService.register(name!, email!, password!).subscribe(() => {
//       alert('User registered');
//       this.router.navigateByUrl('/login');
//     });
//   }
// }


import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    securityQuestion: ['', [Validators.required]],
    securityAnswer: ['', [Validators.required]],
  });

  register() {
    const value = this.registerForm.value;
    this.authService
      .register(
        value.name!,
        value.email!,
        value.password!,
        value.securityQuestion!,
        value.securityAnswer!
      )
      .subscribe(() => {
        alert('User registered');
        this.router.navigateByUrl('/login');
      });
  }
}