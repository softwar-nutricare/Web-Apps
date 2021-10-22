import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NutritionistsComponent} from "../pages/nutritionists/pages/nutritionists/nutritionists.component";
import { ClientsComponent } from '../pages/clients/pages/clients/clients.component';
import {RecipesComponent} from "../pages/recipe/pages/recipe/recipes.component";
import {DietsComponent} from "../pages/diets/pages/diets/diets.component";
import {RecommendationsComponent} from "../pages/recommendations/pages/recommendations/recommendations.component";
import {BillsComponent} from "../pages/bill/pages/bills/bills.component";
import {SpecialtiesComponent} from "../pages/specialties/pages/specialties/specialties.component";
import {AppointmentsComponent} from "../pages/appointments/pages/appointments/appointments.component";
import {PaymentMethodsComponent} from "../pages/paymentMethods/Pages/payment-methods/payment-methods.component";
import { ProfesionalProfilesComponent } from '../pages/profesionalProfiles/pages/profesionalProfiles/profesionalProfiles.component';
const routes: Routes = [
  { path: 'nutritionists', component: NutritionistsComponent },
  { path: 'profesionalProfiles', component: ProfesionalProfilesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'diets', component: DietsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'specialties', component: SpecialtiesComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'paymentMethod', component: PaymentMethodsComponent },
  { path: '', redirectTo: 'nutritionists', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
