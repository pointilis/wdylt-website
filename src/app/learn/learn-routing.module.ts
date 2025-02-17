import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen.component';
import { WriteScreenComponent } from './screens/write-screen/write-screen.component';
import { RecordScreenComponent } from './screens/record-screen/record-screen.component';
import { AuthenticatedOnlyGuard } from '../auth/guards/authenticated-only.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticatedOnlyGuard],
    children: [
      {
        path: '',
        component: DashboardScreenComponent,
      },
      {
        path: 'write',
        children: [
          {
            path: '',
            component: WriteScreenComponent,
          },
          {
            path: ':docId',
            component: WriteScreenComponent,
          }
        ]
      },
      {
        path: 'record',
        component: RecordScreenComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
