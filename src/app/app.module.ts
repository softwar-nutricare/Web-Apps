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
import { DialogCreateComponent } from './pages/nutritionists/pages/dialog-create/dialog-create.component';
import { ClientsComponent } from './pages/clients/pages/clients/clients.component';
import {MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MatDialogModule,
    AppComponent,
    BodyComponent,
    FooterComponent,
    HeaderComponent,
    NutritionistsComponent,
    AppoimentComponent,
    DialogCreateComponent,
    
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogCreateComponent,MatDialogModule]
})
export class AppModule { }
