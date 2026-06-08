import { RouterModule, Routes } from '@angular/router';
import { DistributionComponent } from './distribution/distribution.component';
import { HomeComponent } from './home/home.component';
import { SslErrorComponent } from './ssl-error/ssl-error.component';
import { VerifyGuard } from './_services/verify.guard';
import { SslErrorGuard } from './_services/ssl-error.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'ssl-error', component: SslErrorComponent},
  { path: 'distribution', component: DistributionComponent, canActivate: [SslErrorGuard]},
  { path: 'home', component: HomeComponent, canActivate: [SslErrorGuard]},
  { path: '', component: HomeComponent, canActivate: [VerifyGuard, SslErrorGuard] },
  { path: '**', redirectTo: 'home' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
