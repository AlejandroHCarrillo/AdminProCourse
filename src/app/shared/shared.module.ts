import { CommonModule } from "@angular/common";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [ CommonModule, 
    RouterModule],
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
