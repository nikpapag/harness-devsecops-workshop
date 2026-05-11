import { RouterModule, Routes } from '@angular/router';
import { DistributionComponent } from './distribution/distribution.component';
import { HomeComponent } from './home/home.component';
import { VerifyGuard } from './_services/verify.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'distribution', component: DistributionComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent, canActivate: [VerifyGuard] },
  { path: '**', redirectTo: 'home' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
