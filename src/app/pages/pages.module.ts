import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

// TODO: ng2-charts

import { PagesComponent } from './pages.component';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
//TODO: graficos component
import { AccountSettingsComponent } from './account-settings/account-settings.component';

//  Pipes Module
import { PipesModule } from './../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        AccountSettingsComponent,
        ProfileComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component    
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        CommonModule
    ]
})
export class PagesModule{};

