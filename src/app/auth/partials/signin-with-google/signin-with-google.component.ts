import { Component, inject } from '@angular/core';
import { SigninService } from '../../services/signin/signin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'signin-with-google',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signin-with-google.component.html',
  styleUrl: './signin-with-google.component.scss'
})
export class SigninWithGoogleComponent {

  signInService = inject(SigninService);
  
  // Variable.
  buttonLabel = 'Sign In With Google';

  /**
   * Listen button handler
   */
  onSignInHandler() {
    this.signInService.withGoogle();
  }

}
