import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SigninService } from '../../../auth/services/signin/signin.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/state/reducers/auth/auth.reducer';
import { AuthActions } from '../../../auth/state/actions/auth/auth.actions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-button',
  imports: [
    MatButton,
    MatButtonModule,
    MatIcon,
    MatIconModule,
  ],
  templateUrl: './signin-button.component.html',
  styleUrl: './signin-button.component.scss'
})
export class SigninButtonComponent {

  store = inject(Store<AuthState>);
  matDialog = inject(MatDialog);

  onSignIn() {
    this.store.dispatch(AuthActions.signIn());
    this.matDialog.closeAll();
  }
}
