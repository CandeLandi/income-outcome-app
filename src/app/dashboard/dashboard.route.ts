import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-expenses/statistics/statistics.component';
import { DetailsComponent } from '../income-expenses/details/details.component';
import { IncomeOutcomeComponent } from '../income-expenses/income-outcome.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-outcome', component: IncomeOutcomeComponent },
  { path: 'details', component: DetailsComponent },
  { path: '**', redirectTo: '' },
];
