import { CommonModule } from "@angular/common";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { RouterModule } from "@angular/router";

//  Pipes Module
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  imports: [ CommonModule, 
             RouterModule,
             PipesModule
            ],
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
