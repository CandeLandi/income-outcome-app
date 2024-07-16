import { createAction, props } from '@ngrx/store';
import { IncomeOutcome } from '../models/income-outcome.model';

export const unSetItems = createAction('[IncomeOutcome] Unset Items');

export const setItems = createAction(
  '[IncomeOutcome] Set Items',
  props<{ items: IncomeOutcome[] }>()
);
