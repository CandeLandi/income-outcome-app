import { Component, OnDestroy, OnInit } from '@angular/core';
import { IncomeOutcome } from '../../models/income-outcome.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeOutcomeService } from '../../services/income-outcome.service';
import Swal from 'sweetalert2';
import { AppStateWithIncome } from '../income-outcome.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeOutcome: IncomeOutcome[] = [];
  incomeSubs!: Subscription;

  constructor(private store: Store<AppStateWithIncome>,
              private incomeOutcomeService: IncomeOutcomeService
  ) {}

  ngOnInit(): void {
    this.incomeSubs = this.store
      .select('IncomeOutcome')
      .subscribe(({ items }) => (this.incomeOutcome = items));

  }

  ngOnDestroy(): void {
    this.incomeSubs.unsubscribe();
  }

  deleteItem( uid: string | any ) {

    this.incomeOutcomeService.deleteIncomeOutcome( uid )
    .then( () => Swal.fire('Borrado', 'Item borrado', 'success') )
    .catch( err => Swal.fire('Error', err.mensaje, 'error'))
  }
}
