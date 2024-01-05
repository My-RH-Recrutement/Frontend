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

const moduleRoutes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "",
                component: JobOffersComponent
            },
            {
                path: "job-offers/:id",
                component: JobOffersComponent,
            },
            {
                path: 'job-offers/:id/apply',
                component: ApplyPageComponent
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
                path: "verify",
                component: VerifyCodeComponent
            }
        ]
    },
    {
        path: "recruiter",
        component: DashboardComponent,
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(moduleRoutes)],
    providers: [RouterModule]
})

export class ModulesRoutingModule {}