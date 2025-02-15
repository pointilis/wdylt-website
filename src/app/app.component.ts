import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninService } from './auth/services/signin/signin.service';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/state/reducers/auth/auth.reducer';
import { AuthActions } from './auth/state/actions/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'What Did You Learn Today?';
  signInService = inject(SigninService);
  store = inject(Store<AuthState>)

  constructor() {
    // Always call this first to know user has loggedin or not
    this.store.dispatch(AuthActions.getCurrentUser());
  }

}
