import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeModule } from '@modules/home/home.module';
import { AuthModule } from './auth/auth.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { NotAuthorizedPageComponent } from './errors/pages/not-authorized-page/not-authorized-page.component';
import { NotFoundComponent } from './errors/pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotAuthorizedPageComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    HomeModule,
    AuthModule,
    RecruiterModule,
    RouterModule
  ]
})
export class ModulesModule { }
