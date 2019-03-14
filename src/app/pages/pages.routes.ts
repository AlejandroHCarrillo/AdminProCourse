import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from "./rxjs/rxjs.component";

const pageRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graficas1", component: Graficas1Component },
      { path: "rxjs", component: RxjsComponent},
      { path: "account-settings", component: AccountSettingsComponent },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes);