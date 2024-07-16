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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeOutcomeComponent } from './income-expenses/income-outcome.component';
import { DetailsComponent } from './income-expenses/details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { StatisticsComponent } from './income-expenses/statistics/statistics.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { appReducers } from './app.reducer';
import { OrderIncomePipePipe } from './pipes/order-income.pipe';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeOutcomeComponent,
    DetailsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    StatisticsComponent,
    OrderIncomePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BaseChartDirective,
    NgxChartsModule,
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
