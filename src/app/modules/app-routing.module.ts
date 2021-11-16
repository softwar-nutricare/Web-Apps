import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NutritionistsComponent} from "../pages/crud/nutritionists/pages/nutritionists/nutritionists.component";
import { ClientsComponent } from '../pages/crud/clients/pages/clients/clients.component';
import {RecipesComponent} from "../pages/crud/recipe/pages/recipe/recipes.component";
import {DietsComponent} from "../pages/crud/diets/pages/diets/diets.component";
import {RecommendationsComponent} from "../pages/crud/recommendations/pages/recommendations/recommendations.component";
import {BillsComponent} from "../pages/crud/bill/pages/bills/bills.component";
import {SpecialtiesComponent} from "../pages/crud/specialties/pages/specialties/specialties.component";
import {AppointmentsComponent} from "../pages/crud/appointments/pages/appointments/appointments.component";
import {PaymentMethodsComponent} from "../pages/crud/paymentMethods/Pages/payment-methods/payment-methods.component";
import { ProfesionalProfilesComponent } from '../pages/crud/profesionalProfiles/pages/profesionalProfiles/profesionalProfiles.component';
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
