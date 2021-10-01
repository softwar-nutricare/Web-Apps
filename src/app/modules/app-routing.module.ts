import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NutritionistsComponent} from "../pages/nutritionists/pages/nutritionists/nutritionists.component";


const routes: Routes = [
  { path: 'nutritionists', component: NutritionistsComponent },
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
