import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailsComponent } from './details/details.component';
import { OrderIncomePipePipe } from '../pipes/order-income.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeOutcomeReducer } from './income-outcome.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeOutcomeComponent,
    DetailsComponent,
    StatisticsComponent,
    OrderIncomePipePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    BaseChartDirective,
    DashboardRoutingModule,
    StoreModule.forFeature('IncomeOutcome', incomeOutcomeReducer)
  ]
})
export class IncomeOutcomeModule { }
