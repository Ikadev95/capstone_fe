import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged-user.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: 'auth', pathMatch: "full"},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),  canActivate: [UserGuard] },
  { path: 'pagamenti', loadChildren: () => import('./pages/pagamenti/pagamenti.module').then(m => m.PagamentiModule), canActivate: [UserGuard] },
  { path: 'concorsoFoto', loadChildren: () => import('./pages/concorso-foto/concorso-foto.module').then(m => m.ConcorsoFotoModule), canActivate: [UserGuard] },
  { path: 'concorsoPoesie', loadChildren: () => import('./pages/concorso-poesie/concorso-poesie.module').then(m => m.ConcorsoPoesieModule), canActivate: [UserGuard] },
  { path: 'successPagamento', loadChildren: () => import('./pages/success-pagamento/success-pagamento.module').then(m => m.SuccessPagamentoModule), },
  { path: 'profilo', loadChildren: () => import('./pages/profilo/profilo.module').then(m => m.ProfiloModule), canActivate: [LoggedGuard]},
  { path: 'utenti', loadChildren: () => import('./pages/utenti/utenti.module').then(m => m.UtentiModule) },
  { path: 'giudici', loadChildren: () => import('./pages/giudici/giudici.module').then(m => m.GiudiciModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
