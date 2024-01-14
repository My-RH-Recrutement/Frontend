import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@modules/home/pages/home/home.component";
import { JobOffersComponent } from "@modules/home/pages/job-offers/job-offers.component";
import { AuthComponent } from "@modules/auth/pages/auth/auth.component";
import { SignupComponent } from "@modules/auth/pages/signup/signup.component";
import { VerifyCodeComponent } from "./auth/pages/verify-code/verify-code.component";
import { DashboardComponent } from "./recruiter/pages/dashboard/dashboard.component";
import { JobsComponent } from "./recruiter/pages/jobs/jobs.component";
import { ApplicationsComponent } from "./recruiter/pages/applications/applications.component";
import { CreateJobComponent } from "./recruiter/pages/create-job/create-job.component";
import { JobsListComponent } from "./recruiter/pages/jobs-list/jobs-list.component";
import { ApplyPageComponent } from "./home/pages/apply-page/apply-page.component";
import { LoginComponent } from "@modules/auth/pages/login/login.component";
import { authenticationGuard, authorizationGuard } from "@core/guards";
import { NotAuthorizedPageComponent } from "./errors/pages/not-authorized-page/not-authorized-page.component";
import { NotFoundComponent } from "@modules/errors/pages/not-found/not-found.component";

const moduleRoutes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "",
                redirectTo: "job-offers",
                pathMatch: "full",
            },
            {
                path: "job-offers",
                component: JobOffersComponent
            },
            {
                path: "job-offers/:id",
                component: JobOffersComponent,
            },
            {
                path: 'job-offers/:id/apply',
                component: ApplyPageComponent,
                canActivate: [authenticationGuard]
            }
        ]
    },
    {
        path: "auth",
        component: AuthComponent,
        children: [
            {
                path: "",
                component: SignupComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "verify",
                component: VerifyCodeComponent
            }
        ]
    },
    {
        path: "recruiter",
        component: DashboardComponent,
        canActivate: [authenticationGuard, authorizationGuard],
        // data: {role: Access.RECRUITER},
        children: [
            {
                path: "jobs",
                component: JobsComponent,
                children: [
                    {
                        path: "",
                        component: JobsListComponent
                    },
                    {
                        path: "create-job",
                        component: CreateJobComponent
                    }
                ]
            },
            {
                path: "applications",
                component: ApplicationsComponent
            }
        ]
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    },
    {
        path: "not-authorized",
        component: NotAuthorizedPageComponent
    },
    {
        path: "not-found",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(moduleRoutes)],
    providers: [RouterModule]
})

export class ModulesRoutingModule {}