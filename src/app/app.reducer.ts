import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
/* import * as incomeOutcome from './income-expenses/income-outcome.reducer';
 */
export interface AppState {
  ui: ui.State;
  user: auth.State;
/*   incomeOutcome: incomeOutcome.State; */
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
/*   incomeOutcome: incomeOutcome.incomeOutcomeReducer,
 */};
