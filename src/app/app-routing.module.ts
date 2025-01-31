import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'auth', pathMatch: "full"},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'pagamenti', loadChildren: () => import('./pages/pagamenti/pagamenti.module').then(m => m.PagamentiModule) },
  { path: 'concorsoFoto', loadChildren: () => import('./pages/concorso-foto/concorso-foto.module').then(m => m.ConcorsoFotoModule) },
  { path: 'concorsoPoesie', loadChildren: () => import('./pages/concorso-poesie/concorso-poesie.module').then(m => m.ConcorsoPoesieModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
