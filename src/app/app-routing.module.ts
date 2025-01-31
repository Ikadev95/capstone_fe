import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'auth', pathMatch: "full"},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'concorso', loadChildren: () => import('./pages/concorso/concorso.module').then(m => m.ConcorsoModule) },
  { path: 'pagamenti', loadChildren: () => import('./pages/pagamenti/pagamenti.module').then(m => m.PagamentiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
