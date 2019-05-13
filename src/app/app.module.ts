import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ErrorInterceptor } from './error-interceptor'

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
import { CategoryService } from './categories/category.service';
import { SubcategoryService } from './subcategories/subcategory.service';
import { ProjectService } from './projects/project.service';
import { CreditCardService } from './credit-cards/credit-card.service'
import { InvoiceService } from './invoices/invoice.service'

import { AuthService } from './auth.service'
import { RouteGuard } from './route-guard'

import { AccountDetailsComponent } from './accounts/account-details/account-details.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementsTableComponent } from './movements/movements-table/movements-table.component';
import { SharedMovementsComponent } from './shared/account-movements/shared-movements.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { NewAccountComponent } from './accounts/new-account/new-account.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';
import { CategorySubcategoriesComponent } from './categories/category-details/category-subcategories/category-subcategories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { CategoryMovementsComponent } from './categories/category-details/category-movements/category-movements.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { SubcategoriesTableComponent } from './subcategories/subcategories-table/subcategories-table.component';
import { NewSubcategoryComponent } from './subcategories/new-subcategory/new-subcategory.component';
import { SubcategoryDetailsComponent } from './subcategories/subcategory-details/subcategory-details.component';
import { EditSubcategoryComponent } from './subcategories/edit-subcategory/edit-subcategory.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsTableComponent } from './projects/projects-table/projects-table.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { CreditCardsTableComponent } from './credit-cards/credit-cards-table/credit-cards-table.component';
import { NewCreditCardComponent } from './credit-cards/new-credit-card/new-credit-card.component';
import { CreditCardDetailsComponent } from './credit-cards/credit-card-details/credit-card-details.component';
import { CreditCardMovementsComponent } from './credit-cards/credit-card-details/credit-card-movements/credit-card-movements.component';
import { CreditCardInvoicesComponent } from './credit-cards/credit-card-details/credit-card-invoices/credit-card-invoices.component';
import { EditCreditCardComponent } from './credit-cards/edit-credit-card/edit-credit-card.component';
import { TransfersComponent } from './transfers/transfers.component';
import { NewMovementComponent } from './movements/new-movement/new-movement.component';
import { MovementDetailsComponent } from './movements/movement-details/movement-details.component';
import { EditMovementComponent } from './movements/edit-movement/edit-movement.component';
import { CreditCardInvoicesItemComponent } from './credit-cards/credit-card-details/credit-card-invoices/credit-card-invoices-item/credit-card-invoices-item.component';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { InvoiceDetailsPayComponent } from './invoices/invoice-details/invoice-details-pay/invoice-details-pay.component';
import { InvoiceDetailsPrintComponent } from './invoices/invoice-details/invoice-details-print/invoice-details-print.component';
import { LoginComponent } from './login/login.component';

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
    SharedMovementsComponent,
    EditAccountComponent,
    NewAccountComponent,
    CategoriesComponent,
    CategoriesTableComponent,
    CategoryDetailsComponent,
    CategorySubcategoriesComponent,
    SubcategoriesComponent,
    CategoryMovementsComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    SubcategoriesTableComponent,
    NewSubcategoryComponent,
    SubcategoryDetailsComponent,
    EditSubcategoryComponent,
    ProjectsComponent,
    ProjectsTableComponent,
    ProjectDetailsComponent,
    NewProjectComponent,
    EditProjectComponent,
    CreditCardsComponent,
    CreditCardsTableComponent,
    NewCreditCardComponent,
    CreditCardDetailsComponent,
    CreditCardMovementsComponent,
    CreditCardInvoicesComponent,
    EditCreditCardComponent,
    TransfersComponent,
    NewMovementComponent,
    MovementDetailsComponent,
    EditMovementComponent,
    CreditCardInvoicesItemComponent,
    InvoiceDetailsComponent,
    InvoiceDetailsPayComponent,
    InvoiceDetailsPrintComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AccountService,
    MovementService,
    CategoryService,
    SubcategoryService,
    ProjectService,
    CreditCardService,
    InvoiceService,
    AuthService,
    RouteGuard,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
