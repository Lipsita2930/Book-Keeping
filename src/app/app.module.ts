import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { ChartModule } from 'primeng/chart';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ExpenseComponent } from './Screen/expense/expense.component';
import { JournalsComponent } from './Screen/journals/journals.component';
import { AccountsComponent } from './Screen/accounts/accounts.component';
import { ReportsComponent } from './Screen/reports/reports.component';
import { AngularMaterialModule } from './Utilities/AngularMaterial.Module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { WelcomePageComponent } from './Screen/welcome-page/welcome-page.component';
import { SignupComponent } from './Components/signup/signup.component'
import { MainComponent } from './Components/main/main.component';
// import { ExpenseDetailsComponent } from './Screen/expense-details/expense-details.component';
import { UpdateExpenseComponent } from './Screen/expense/update-expense/update-expense.component';
import { ExpenseDetailsComponent } from './Screen/expense-details/expense-details.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { AboutComponent } from './Components/about/about.component';
import { TransactionDetailsComponent } from './Components/transaction-details/transaction-details.component';
import { ExpenseReportsComponent } from './Screen/reports/expense-reports/expense-reports.component';
import { PaymentReportComponent } from './Screen/reports/payment-report/payment-report.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';
import { AssetsReportsComponent } from './Screen/reports/assets-reports/assets-reports.component';
import { InvoiceCompComponent } from './Screen/invoice-comp/invoice-comp.component';
import { FinancialReportComponent } from './Screen/reports/financial-report/financial-report.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ExpenseComponent,
    JournalsComponent,
    AccountsComponent,
    ReportsComponent,
    WelcomePageComponent, 
    SignupComponent,
    MainComponent,
    UpdateExpenseComponent,
    ExpenseDetailsComponent,
    NavbarComponent,
    UpdateUserComponent,
    AboutComponent,
    TransactionDetailsComponent,
    ExpenseReportsComponent,
    PaymentReportComponent,
    InvoiceComponent,
    AssetsReportsComponent,
    InvoiceCompComponent,
    FinancialReportComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
