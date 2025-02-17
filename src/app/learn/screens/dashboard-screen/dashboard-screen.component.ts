import { afterNextRender, Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MyAccountButtonComponent } from '../../../auth/partials/my-account-button/my-account-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { LearnActions } from '../../state/actions/learn/learn.actions';
import { Store } from '@ngrx/store';
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import { ContentListComponent } from '../../partials/content-list/content-list.component';

@Component({
  selector: 'app-dashboard-screen',
  imports: [
    MatCardModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MyAccountButtonComponent,
    ContentListComponent,
    DashboardLogoComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    JsonPipe,
  ],
  templateUrl: './dashboard-screen.component.html',
  styleUrl: './dashboard-screen.component.scss'
})
export class DashboardScreenComponent {

  store = inject(Store<LearnState>);
  
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {
    afterNextRender(() => {
      console.log('after next render')
    })
  }
  
}
