import { Pipe, PipeTransform } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipePipe implements PipeTransform {

  transform(items: IncomeOutcome[]): IncomeOutcome[] {

    const itemsCopy = [...items];
    return itemsCopy.sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
