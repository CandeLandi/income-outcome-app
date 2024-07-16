import { Component, OnDestroy, OnInit } from '@angular/core';
import { IncomeOutcome } from '../../models/income-outcome.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeOutcome: IncomeOutcome[] = [];
  incomeSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.incomeSubs = this.store
      .select('incomeOutcome')
      .subscribe(({ items }) => (this.incomeOutcome = items));
  }

  ngOnDestroy(): void {}

  deleteItem(uid: string | any) {
    console.log(uid);
  }
}
