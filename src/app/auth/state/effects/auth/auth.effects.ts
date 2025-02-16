import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../../actions/auth/auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { SigninService } from '../../../services/signin/signin.service';
import { IUser } from '../../../auth.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  private readonly signInService = inject(SigninService);
  private readonly router = inject(Router);

  constructor(private actions$: Actions) {}

  // ...
  // GET CURRENT USER
  // ...
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() => 
        this.signInService.getCurrentUser().pipe(
          map((res) => AuthActions.getCurrentUserSuccess({ data: res?.data as IUser })),
          catchError(error => of(AuthActions.getCurrentUserFailure({ error: error }))),
        )
      )
    )
  )

  getCurrentUserSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUserSuccess),
      tap(({ data }) => {
        console.log(data)
      })
    ), { dispatch: false }
  )

  getCurrentUserFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUserFailure),
      tap(({ error }) => {
        console.log(error)
      })
    ), { dispatch: false }
  )


  // ...
  // SIGNIN
  // ...
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(() => 
        this.signInService.signIn().pipe(
          map((res) => {
            return AuthActions.signInSuccess({ data: res })
          }),
          catchError(error => of(AuthActions.signInFailure({ error: error }))),
        )
      )
    )
  )

  signInSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      tap(({ data }) => {
        console.log('signIn success', data);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  signInFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.signInFailure),
      tap(() => {
        console.log('signIn failure')
      })
    ), { dispatch: false }
  )


  // ...
  // SIGNOUT
  // ...
  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() => 
        this.signInService.signOut().pipe(
          map((res) => AuthActions.signOutSuccess()),
          catchError(error => of(AuthActions.signOutFailure())),
        )
      )
    )
  )

  signOutSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.signOutSuccess),
      tap(() => {
        console.log('signout success');
        this.router.navigate(['/'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  signOutFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.signOutFailure),
      tap(() => {
        console.log('signout failure')
      })
    ), { dispatch: false }
  )

}
