import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';7
import * as authActions from '../auth/auth.actions'

@Injectable({
  providedIn: 'root',
})

export class AuthService {


  userSubscription!: Subscription;

  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fUser) => {
 /*      console.log(fUser?.uid); */
      if ( fUser ) {
        //existe
        this.userSubscription = this.firestore.doc(`${ fUser.uid }/user`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          console.log({ firestoreUser })
          const user = User.fromFirebase( firestoreUser );
          this.store.dispatch( authActions.setUser({ user }))
        })
      } else {
        //no existe
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser())
      }
    });
  }

  crearUsuario(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {

        const newUser = new User( response.user.uid, name, email);

        return this.firestore.doc(`${response.user.uid}/user`).set({...newUser});
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
