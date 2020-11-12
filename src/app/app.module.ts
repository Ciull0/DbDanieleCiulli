import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientiComponent } from './clienti/clienti.component';
import { NoleggioUtenteComponent } from './noleggio-utente/noleggio-utente.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    FormComponent,
    HomeComponent,
    NavbarComponent,
    ClientiComponent,
    NoleggioUtenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
