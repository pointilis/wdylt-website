import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MyAccountButtonComponent } from '../../../auth/partials/my-account-button/my-account-button.component';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUser } from '../../../auth/auth.model';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home-screen',
  imports: [
    MatCardModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MyAccountButtonComponent,
    RouterModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {

  auth = inject(Auth);
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
}
