import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { IUser } from '../../auth.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private readonly auth = inject(Auth);
  private readonly user: BehaviorSubject<{ data: IUser | null, error: unknown }> = new BehaviorSubject<{
    data: IUser | null,
    error: unknown,
  }>({ data: null, error: null });

  constructor() { }

  /**
   * Use Google Account.
   */
  async withGoogle() {
    const provider = new GoogleAuthProvider();
    // Label: See and download your contacts
    // Desc: We want to see your name for internal used only, not shared to others
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // Label: See, edit, create, and delete only the specific Google Drive files you use with this app
    // Desc: This application have feature to record voice note, all of voice file will saved to your private
    // Google drive account and not shared to anyone
    // provider.addScope('https://www.googleapis.com/auth/drive.file');
    provider.setCustomParameters({
      'allow_signup': 'true',
    });

    this.auth.useDeviceLanguage();
    return await signInWithPopup(this.auth, provider);
  }

  signIn(): Observable<any> {
    const withGoogle = this.withGoogle();
    return new Observable(observer => {
      try {
        withGoogle.then(value => {
          if (value && value.user) {
            observer.next(Object.freeze(value.user));
          }
        });
      } catch(error) {
        observer.error(error);
      }
    });
  }

  /**
   * Get current state.
   */
  getCurrentUser(): Observable<{ data: IUser | null }> {
    return new Observable(observer => {
      this.auth.onAuthStateChanged(async (user) => {
        const tokenResult = await user?.getIdTokenResult();
        if (tokenResult) {
          observer.next({
            data: {
              uid: user?.uid as string,
              email: user?.email as string,
              displayName: user?.displayName as string,
              photoURL: user?.photoURL as string,
              tokenResult: {
                authTime: tokenResult?.authTime as string,
                expirationTime: tokenResult?.expirationTime as string,
                issuedAtTime: tokenResult?.issuedAtTime as string,
                signInProvider: tokenResult?.signInProvider as string,
                token: tokenResult?.token as string,
              }
            },
          });
        } else {
          observer.error('User not found.');
        }
      });
    });
  }

  /**
   * Check is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * Signout
   */
  signOut(): Observable<any> {
    const observable$ = new Observable(observer => {
      this.auth.signOut()
        .then(() => observer.next(true))
        .catch((error) => observer.error(error));
    })
    
    return observable$;
  }

}
