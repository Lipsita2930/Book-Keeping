import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AccountsComponent } from './Screen/accounts/accounts.component';
import { ExpenseComponent } from './Screen/expense/expense.component';
import { JournalsComponent } from './Screen/journals/journals.component';
import { ReportsComponent } from './Screen/reports/reports.component';
import { WelcomePageComponent } from './Screen/welcome-page/welcome-page.component';
import { MainComponent } from './Components/main/main.component';
import { ExpenseDetailsComponent } from './Screen/expense-details/expense-details.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';
import { AboutComponent } from './Components/about/about.component';
import { AuthGuard } from './guard/auth.guard';
import { InvoiceCompComponent } from './Screen/invoice-comp/invoice-comp.component';
// import { ExpenseDetailsComponent } from './Screen/expense-details/expense-details.component';
const routes: Routes = [
  {path:'',redirectTo:'navbar',pathMatch:'full'},
  {path:"navbar",component:NavbarComponent},
  {path:"signup",component:SignupComponent},
  {path:"main", component:MainComponent,canActivate : [AuthGuard] ,children : [
    {path : "home" , component : HomeComponent},
    {path : "dashboard",component:DashboardComponent},
    {path:"expense",component:ExpenseComponent},
    {path:"journals",component:JournalsComponent},
    {path:"accounts",component:AccountsComponent},
    {path:"invoice-comp",component:InvoiceCompComponent},
    {path:"reports",component:ReportsComponent},
    {path:"expense-details",component:ExpenseDetailsComponent},
    {path:"about",component:AboutComponent},
  
  ]},
  
{path:"update-user",component:UpdateUserComponent},
{path:"about",component:AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
