import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { appReducers } from './app.reducer';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

// Modulos
import { AuthModule } from './auth/auth.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { IncomeOutcomeModule } from './income-expenses/income-outcome.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IncomeOutcomeModule,
    DashboardRoutingModule,
    BaseChartDirective,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [provideCharts(withDefaultRegisterables()),],
  bootstrap: [AppComponent],
})
export class AppModule {}
