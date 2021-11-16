import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./modules/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material.module";
import { BodyComponent } from './pages/body/body.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import {NutritionistsComponent} from "./pages/crud/nutritionists/pages/nutritionists/nutritionists.component";
import {ClientsComponent} from "./pages/crud/clients/pages/clients/clients.component";
import {RecipesComponent} from "./pages/crud/recipe/pages/recipe/recipes.component";
import { DietsComponent } from './pages/crud/diets/pages/diets/diets.component';
import { RecommendationsComponent } from './pages/crud/recommendations/pages/recommendations/recommendations.component';
import {BillsComponent} from "./pages/crud/bill/pages/bills/bills.component";
import { SpecialtiesComponent } from './pages/crud/specialties/pages/specialties/specialties.component';
import { AppointmentsComponent } from './pages/crud/appointments/pages/appointments/appointments.component';
import {PaymentMethodsComponent} from "./pages/crud/paymentMethods/Pages/payment-methods/payment-methods.component";
import { ProfesionalProfilesComponent } from './pages/crud/profesionalProfiles/pages/profesionalProfiles/profesionalProfiles.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    NutritionistsComponent,
    ClientsComponent,
    RecipesComponent,
    DietsComponent,
    RecommendationsComponent,
    BillsComponent,
    ProfesionalProfilesComponent,
    SpecialtiesComponent,
    AppointmentsComponent,
    PaymentMethodsComponent
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
