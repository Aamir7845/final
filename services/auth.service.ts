import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  http = inject(HttpClient);

  // register(name: string, email: string, password: string) {
  //   return this.http.post(environment.apiUrl + '/auth/register', {
  //     name,
  //     email,
  //     password,
  //   });
  // }
   // ✅ Register with security question & answer
  register(name: string, email: string, password: string, securityQuestion: string, securityAnswer: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
      securityQuestion,
      securityAnswer,
    });
  }
  //getting all users by admin
  getmyusers()
  {
       return this.http.get<any[]>(environment.apiUrl + '/auth/users');
  }
  //deleting user by admin
  deleteUser(email:string)
  {
     return this.http.delete(environment.apiUrl + `/auth/users/${email}`);
  }
  //updating user data by user
updateUser(oldName: string, oldEmail: string, newName: string, newEmail: string)
{
  console.log(oldEmail);
  console.log(newName);
  return this.http.post(environment.apiUrl + `/auth/update`, {
    oldName,
    oldEmail,
    newName,
    newEmail
  });
}

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/login', {
      email,
      password,
    });
  }

  // ✅ 1. Get Security Question by Email
  getSecurityQuestion(email: string) {
    return this.http.post<{ question: string }>(environment.apiUrl + '/auth/get-security-question', {
      email,
    });
  }

  // ✅ 2. Verify Answer to Security Question
  verifySecurityAnswer(email: string, answer: string) {
    return this.http.post(environment.apiUrl + '/auth/verify-security-answer', {
      email,
      answer,
    });
  }
  // ✅ 3. Reset Password after Answer is Verified
  resetPassword(email: string, newPassword: string) {
    return this.http.post(environment.apiUrl + '/auth/reset-password', {
      email,
      newPassword,
    });
  }

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  get isAdmin() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }
  get userEmail() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
