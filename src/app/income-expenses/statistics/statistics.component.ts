import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IncomeOutcome } from '../../models/income-outcome.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  income: number = 0;
  outcome: number = 0;

  totalIncome: number = 0;
  totalOutcome: number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [350, 450] }],
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('incomeOutcome')
      .subscribe(({ items }) => this.generateStatistic(items));
  }

  generateStatistic(items: IncomeOutcome[]) {
    this.totalIncome = 0;
    this.totalOutcome = 0;
    this.income = 0;
    this.outcome = 0;

    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIncome += item.amount;
        this.income++;
      } else {
        this.totalOutcome += item.amount;
        this.outcome++;
      }
    }

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.totalIncome, this.totalOutcome] }],
    };
  }
}
