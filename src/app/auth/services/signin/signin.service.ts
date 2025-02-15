import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IUser } from '../../auth.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private readonly auth = inject(Auth);
  private readonly user: BehaviorSubject<{
    data: IUser | null,
    error: unknown,
  }> = new BehaviorSubject<{
    data: IUser | null,
    error: unknown,
  }>({ data: null, error: null });

  constructor() { }

  /**
   * Use Google Account.
   */
  public withGoogle() {
    const provider = new GoogleAuthProvider();
    // Label: See and download your contacts
    // Desc: We want to see your name for internal used only, not shared to others
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // Label: See, edit, create, and delete only the specific Google Drive files you use with this app
    // Desc: This application have feature to record voice note, all of voice file will saved to your private
    // Google drive account and not shared to anyone
    provider.addScope('https://www.googleapis.com/auth/drive.file');
    provider.setCustomParameters({
      'allow_signup': 'true',
    });

    this.auth.useDeviceLanguage();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
  }

  /**
   * Get current state.
   */
  getCurrentUser(): Observable<{ data: IUser | null, error: unknown }> {
    this.auth.onAuthStateChanged(async (user) => {
      // set user state
      if (user) {
        // success
        const tokenResult = await user?.getIdTokenResult();
        this.user.next({
          data: {
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
          },
          error: null,
        });
      } else {
        // error
        this.user.next({
          data: null,
          error: new Error('User not found'),
        });
      }
    });

    return new Observable((subscriber) => {
      this.user.subscribe(({ data, error }) => {
        if (error) {
          const error: any = new Error('User not found.');
          error.timestamp = Date.now();
          subscriber.error(error);
          subscriber.complete();
        }

        if (data) {
          subscriber.next(this.user.value);
          subscriber.complete();
        }
      });
    })
  }

}
