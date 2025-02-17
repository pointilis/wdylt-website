import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LearnActions } from '../../actions/learn/learn.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LearnService } from '../../../services/learn/learn.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class LearnEffects {

  private learnService = inject(LearnService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor(private actions$: Actions) {}

  // ...
  // ADD
  // ...
  addLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.addLearn),
      mergeMap(({ data }) => {
        return this.learnService.addLearn(data).pipe(
          map(res => LearnActions.addLearnSuccess({ data: res })),
          catchError(error => of(LearnActions.addLearnFailure({ error: error })))
        )
      })
    )
  )

  addLearnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.addLearnSuccess),
      map(({ data }) => {
        console.log(data);
        this.snackBar.open('Successfully saved', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  addLearnFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.addLearnFailure),
      map(({ error }) => {
        console.log(error);
      })
    ), { dispatch: false }
  )


  // ...
  // GET LEARNS
  // ...
  getLearns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearns),
      mergeMap(({ filter }) => {
        return this.learnService.getLearns(filter).pipe(
          map(res => LearnActions.getLearnsSuccess({ data: res, filter: filter })),
          catchError(error => of(LearnActions.getLearnsFailure({ error: error, filter: filter })))
        )
      })
    )
  )

  getLearnsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearnsSuccess),
      map(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  getLearnsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearnsFailure),
      map(({ error }) => {
        console.log(error);
      })
    ), { dispatch: false }
  )


  // ...
  // GET LEARN
  // ...
  getLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearn),
      mergeMap(({ docId, uid }) => {
        return this.learnService.getLearn(docId, uid).pipe(
          map(res => LearnActions.getLearnSuccess({ data: res })),
          catchError(error => of(LearnActions.getLearnFailure({ error: error })))
        )
      })
    )
  )

  getLearnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearnSuccess),
      map(({ data }) => {
        console.log(data);
      })
    ), { dispatch: false }
  )

  getLearnFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.getLearnFailure),
      map(({ error }) => {
        console.log(error);
      })
    ), { dispatch: false }
  )


  // ...
  // UPDATE LEARN
  // ...
  updateLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.updateLearn),
      mergeMap(({ docId, uid, data }) => {
        return this.learnService.updateLearn(docId, uid, data).pipe(
          map(res => LearnActions.updateLearnSuccess({ data: res })),
          catchError(error => of(LearnActions.updateLearnFailure({ error: error })))
        )
      })
    )
  )

  updateLearnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.updateLearnSuccess),
      map(({ data }) => {
        console.log(data);
        this.snackBar.open('Successfully update', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  updateLearnFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.updateLearnFailure),
      map(({ error }) => {
        console.log(error);
      })
    ), { dispatch: false }
  )


  // ...
  // DELETE LEARN
  // ...
  deleteLearn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.deleteLearn),
      mergeMap(({ docId, uid }) => {
        return this.learnService.deleteLearn(docId, uid).pipe(
          map(res => LearnActions.deleteLearnSuccess({ data: res })),
          catchError(error => of(LearnActions.deleteLearnFailure({ error: error })))
        )
      })
    )
  )

  deleteLearnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.deleteLearnSuccess),
      map(({ data }) => {
        console.log(data);
        this.snackBar.open('Successfully deleted!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      })
    ), { dispatch: false }
  )

  deleteLearnFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearnActions.deleteLearnFailure),
      map(({ error }) => {
        console.log(error);
      })
    ), { dispatch: false }
  )

}
