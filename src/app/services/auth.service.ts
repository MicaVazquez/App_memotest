import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authF: AngularFireAuth, public router: Router) {}

  getUserLogged() {
    return this.authF.authState;
  }
  getUser() {
    return this.authF.currentUser;
  }

  getEmail() {
    return this.authF.currentUser.then((user) => {
      if (user) {
        return user.email;
      } else {
        return null;
      }
    });
  }
  async login(email: string, password: string) {
    return await this.authF.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.authF.signOut().then(() => this.router.navigate(['login']));
  }
}
