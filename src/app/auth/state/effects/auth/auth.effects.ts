import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../../actions/auth/auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { SigninService } from '../../../services/signin/signin.service';
import { IUser } from '../../../auth.model';



@Injectable()
export class AuthEffects {

  private readonly signInService = inject(SigninService);

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

}
