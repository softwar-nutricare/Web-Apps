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
import {ClientsComponent} from "./pages/clients/pages/clients/clients.component";
import {RecipesComponent} from "./pages/recipe/pages/recipe/recipes.component";
import { DietsComponent } from './pages/diets/pages/diets/diets.component';
import { RecommendationsComponent } from './pages/recommendations/pages/recommendations/recommendations.component';
import {BillsComponent} from "./pages/bill/pages/bills/bills.component";
import { SpecialtiesComponent } from './pages/specialties/pages/specialties/specialties.component';
import { AppointmentsComponent } from './pages/appointments/pages/appointments/appointments.component';
import {PaymentMethodsComponent} from "./pages/paymentMethods/Pages/payment-methods/payment-methods.component";
import { ProfesionalProfilesComponent } from './pages/profesionalProfiles/pages/profesionalProfiles/profesionalProfiles.component';


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
