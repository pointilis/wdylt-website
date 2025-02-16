import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { IUser } from '../../auth.model';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../state/reducers/auth/auth.reducer';
import * as AuthSelectors from '../../state/selectors/auth/auth.selectors';
import { SigninService } from '../../services/signin/signin.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthActions } from '../../state/actions/auth/auth.actions';

@Component({
  selector: 'my-account-button',
  imports: [
    MatButton,
    MatButtonModule,
    MatIcon,
    MatIconModule,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './my-account-button.component.html',
  styleUrl: './my-account-button.component.scss'
})
export class MyAccountButtonComponent {

  private readonly store = inject(Store<AuthState>);
  private readonly signInService = inject(SigninService);
  public readonly user$!: Observable<{ data: IUser | null, status: string }>;

  constructor() {
    this.user$ = this.store.pipe(select(AuthSelectors.user));
  }

  onSignIn() {
    this.store.dispatch(AuthActions.signIn());
  }

  onLogout() {
    this.store.dispatch(AuthActions.signOut());
  }

}
