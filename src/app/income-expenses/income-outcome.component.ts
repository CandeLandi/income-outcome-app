import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeOutcome } from '../models/income-outcome.model';
import { IncomeOutcomeService } from '../services/income-outcome.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
})
export class IncomeOutcomeComponent implements OnInit {
  incomeForm!: FormGroup;
  loading: boolean = false;
  type: string = 'ingreso';
  loadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeOutcomeService: IncomeOutcomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.loading = isLoading));

    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  guardar() {
    if (this.incomeForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    /*     console.log( this.incomeForm.value );
    console.log( this.type ); */

    const { description, amount } = this.incomeForm.value;

    const _IncomeOutcome = new IncomeOutcome(description, amount, this.type);

    this.incomeOutcomeService
      .createIncomeOutcome(_IncomeOutcome)
      .then(() => {
        this.incomeForm.reset();
        Swal.fire('Registro creado', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
