import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NutritionistsComponent} from "../pages/nutritionists/pages/nutritionists/nutritionists.component";
import { ClientsComponent } from '../pages/clients/pages/clients/clients.component';
import {RecipesComponent} from "../pages/recipe/pages/recipe/recipes.component";
import {DietsComponent} from "../pages/diets/pages/diets/diets.component";
import {RecommendationsComponent} from "../pages/recommendations/pages/recommendations/recommendations.component";

const routes: Routes = [
  { path: 'nutritionists', component: NutritionistsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'diets', component: DietsComponent },
  { path: 'recommendations', component: RecommendationsComponent },
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
