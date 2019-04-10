import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ROUTES } from './app.routes';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsTableComponent } from './accounts/accounts-table/accounts-table.component';

import { AccountService } from './accounts/accounts.service';
import { MovementService } from './movements/movements.service';

import { AccountDetailsComponent } from './accounts/account-details/account-details.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementsTableComponent } from './movements/movements-table/movements-table.component';
import { AccountMovementsComponent } from './accounts/account-details/account-movements/account-movements.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { NewAccountComponent } from './accounts/new-account/new-account.component';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ControlSidebarComponent,
    FooterComponent,
    DashboardComponent,
    AccountsComponent,
    AccountsTableComponent,
    AccountDetailsComponent,
    MovementsComponent,
    MovementsTableComponent,
    AccountMovementsComponent,
    EditAccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountService,
    MovementService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
