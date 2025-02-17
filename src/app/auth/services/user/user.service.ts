import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = inject(Auth);

  constructor() { }

  /**
   * Check is authenticated
   */
  async getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(async(user) => {
        if (user) {
          const tokenResult = await user?.getIdTokenResult();
          resolve({
            uid: user?.uid as string,
            email: user?.email as string,
            displayName: user?.displayName as string,
            photoURL: user?.photoURL as string,
            tokenResult: {
              authTime: tokenResult.authTime,
              expirationTime: tokenResult.expirationTime,
              issuedAtTime: tokenResult.issuedAtTime,
              signInProvider: tokenResult.signInProvider,
              token: tokenResult.token,
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  }

}
