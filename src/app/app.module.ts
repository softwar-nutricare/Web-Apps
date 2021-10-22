import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./modules/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import { BodyComponent } from './pages/body/body.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import {NutritionistsComponent} from "./pages/nutritionists/pages/nutritionists/nutritionists.component";
import {AppoimentComponent} from "./appoiment/appoiment.component";
import {ClientsComponent} from "./pages/clients/pages/clients/clients.component";
import {DialogCreateClientsComponent} from "./pages/clients/pages/dialog-create-clients/dialog-create-clients.component";
import {RecipesComponent} from "./pages/recipe/pages/recipe/recipes.component";
import { DialogAddRecipeComponent } from './pages/recipe/pages/dialog-add-recipe/dialog-add-recipe.component';
import { DietsComponent } from './pages/diets/pages/diets/diets.component';
import { RecommendationsComponent } from './pages/recommendations/pages/recommendations/recommendations.component';
import {BillsComponent} from "./pages/bill/pages/bills/bills.component";
import { SpecialtiesComponent } from './pages/specialties/pages/specialties/specialties.component';
import { AppointmentsComponent } from './pages/appointments/pages/appointments/appointments.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    NutritionistsComponent,
    AppoimentComponent,
    ClientsComponent,
    DialogCreateClientsComponent,
    RecipesComponent,
    DialogAddRecipeComponent,
    DietsComponent,
    RecommendationsComponent,
    BillsComponent,
    SpecialtiesComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
