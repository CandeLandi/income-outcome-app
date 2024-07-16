import { createReducer, on } from '@ngrx/store';
import { unSetItems, setItems } from './income-outcome.actions';
import { IncomeOutcome } from '../models/income-outcome.model';

export interface State {
  items: IncomeOutcome[];
}

export const initialState: State = {
  items: [],
};

const _incomeOutcomeReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function incomeOutcomeReducer(state: State | undefined, action: any) {
  return _incomeOutcomeReducer(state, action);
}
