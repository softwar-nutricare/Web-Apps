import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './pages/body/body.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import {MaterialModule} from "./modules/material.module";
import { NutritionistsComponent } from './pages/nutritionists/pages/nutritionists/nutritionists.component';
import { NutricionistComponentComponent } from './nutricionist-component/nutricionist-component.component';
import { NutricionistComponent } from './nutricionist/nutricionist.component';
import { ClientComponentComponent } from './client-component/client-component.component';
import { RecipeComponentComponent } from './recipe-component/recipe-component.component';
import { AppoimentComponentComponent } from './appoiment-component/appoiment-component.component';
import { ClientComponent } from './client/client.component';
import { AppoimentComponent } from './appoiment/appoiment.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    NutritionistsComponent,
    NutricionistComponentComponent,
    NutricionistComponent,
    ClientComponentComponent,
    RecipeComponentComponent,
    AppoimentComponentComponent,
    ClientComponent,
    AppoimentComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
