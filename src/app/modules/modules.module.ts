import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeModule } from '@modules/home/home.module';
import { AuthModule } from './auth/auth.module';
import { RecruiterModule } from './recruiter/recruiter.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    HomeModule,
    AuthModule,
    RecruiterModule
  ]
})
export class ModulesModule { }
