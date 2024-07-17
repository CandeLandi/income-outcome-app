import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { IncomeOutcomeModule } from '../income-expenses/income-outcome.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    IncomeOutcomeModule
  ]
})
export class DashboardModule { }
