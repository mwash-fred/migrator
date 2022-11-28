import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { OTPComponent } from './components/Auth/otp/otp.component';
import { MigrateComponent } from './components/Dashboard/migrate/migrate.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: "auth", children:[
    {path:"login", component: LoginComponent },
    {path:"otp", component: OTPComponent},
    {path: "**", component: PageNotFoundComponent}
  ]},
  {path: "dashboard", children:[
    {path:"migrate", component : MigrateComponent},
    {path: "**", component: PageNotFoundComponent}
  ]},
  {path: "/", redirectTo: '/dashboard/migrate'},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
