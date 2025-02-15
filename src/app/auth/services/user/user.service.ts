import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = inject(Auth);

  constructor() { }

  get() {
    const user = this.auth.currentUser;
    console.log(user);
    return user;
  }
}
