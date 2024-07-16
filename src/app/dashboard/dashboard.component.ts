import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import * as incomeOutcomeActions from '../income-expenses/income-outcome.actions';
import { IncomeOutcome } from '../models/income-outcome.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  incomeSubs!: Subscription;
  userSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private incomeOutcomeService: IncomeOutcomeService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        console.log(user);
        this.incomeSubs = this.incomeOutcomeService
          .initIncomeOutcomeListener(user!.uid)
          .subscribe((incomeOutcomeFB) => {
            console.log('Firebase Items:', incomeOutcomeFB);
            this.store.dispatch(
              incomeOutcomeActions.setItems({ items: incomeOutcomeFB })
            );
          });
      });
  }
  /*   ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( ({user}) => {
      console.log(user )
      this.incomeOutcomeService.initIncomeOutcomeListener( user!.uid)
      .subscribe( incomeOutcomeFB => {

        this.store.dispatch( incomeOutcomeActions.setItems( { items: incomeOutcomeFB } ))

      })
    })
  } */

  ngOnDestroy(): void {
    this.incomeSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
