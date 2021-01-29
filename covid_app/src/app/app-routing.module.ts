import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCovidDataComponent } from './add-covid-data/add-covid-data.component';
import { AuthGuard } from './auth.guard';
import { CountryDataComponent } from './country-data/country-data.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { SecurePagesGuard } from './secure-pages.guard';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  { path: "signin", component: SigninComponent,
    canActivate: [SecurePagesGuard]},
  { path: "covidData", component: CovidDataComponent,
    canActivate: [AuthGuard]},
  { path: "", pathMatch: "full", redirectTo: "signin"},
  { path: "**", redirectTo: "signin"},
  { path: "countryData", component : CountryDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
