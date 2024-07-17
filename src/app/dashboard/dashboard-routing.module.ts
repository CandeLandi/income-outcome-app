import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.route';
import { authGuard } from '../services/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    /* canActivate: [authGuard] */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
