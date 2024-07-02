import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-exit/statistics/statistics.component';
import { IncomeExitComponent } from '../income-exit/income-exit.component';
import { DetailsComponent } from '../income-exit/details/details.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-exit', component: IncomeExitComponent },
  { path: 'details', component: DetailsComponent },
  { path: '**', redirectTo: '' },
];
