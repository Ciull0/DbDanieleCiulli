import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClientiComponent } from './clienti/clienti.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'clienti',
    component: ClientiComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
