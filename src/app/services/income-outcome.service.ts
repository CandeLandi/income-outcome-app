import { Injectable } from '@angular/core';
import { IncomeOutcome } from '../models/income-outcome.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService
  ) { }

  createIncomeOutcome( incomeOutcome: IncomeOutcome ){
    const uid = this.authService.user?.uid;
    delete incomeOutcome.uid;

   return this.firestore.doc(`${ uid }/income-outcome`)
    .collection('items')
    .add({ ...incomeOutcome })
    .then( (ref) => console.log('exito!', ref ))
    .catch( err => console.warn(err))
  }

  initIncomeOutcomeListener( uid: string ){

    return this.firestore.collection(`${ uid }/income-outcome/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot =>
        snapshot.map( doc => ({
        uid: doc.payload.doc.id,
        ...doc.payload.doc.data() as any
        })
      )
      )
    )
  }


  deleteIncomeOutcome( uidItem: string ){

    const uid = this.authService.user?.uid;
    return this.firestore.doc(`${ uid }/income-outcome/items/${ uidItem }`).delete();

  }

}
