import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NutritionistsComponent} from "../pages/nutritionists/pages/nutritionists/nutritionists.component";
import { ClientsComponent } from '../pages/clients/pages/clients/clients.component';
import {RecipesComponent} from "../pages/recipe/pages/recipe/recipes.component";

const routes: Routes = [
  { path: 'nutritionists', component: NutritionistsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'recipes', component: RecipesComponent },
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
