import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MyAccountButtonComponent } from '../../../auth/partials/my-account-button/my-account-button.component';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SigninButtonComponent } from '../../../shared/partials/signin-button/signin-button.component';
import { Store } from '@ngrx/store';
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import { LearnActions } from '../../state/actions/learn/learn.actions';

@Component({
  selector: 'app-home-screen',
  imports: [
    MatCardModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    MyAccountButtonComponent,
    SigninButtonComponent,
    RouterModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {

  auth = inject(Auth);
  matDialog = inject(MatDialog);
  store = inject(Store<LearnState>);
  isLoggedIn$: Observable<boolean> = new Observable<boolean>(undefined);

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn$ = new Observable((subscriber) => {
        if (user) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
      });
    });
  }

  openSignInDialog() {
    const dialogRef = this.matDialog.open(SigninButtonComponent, { data: {} });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
