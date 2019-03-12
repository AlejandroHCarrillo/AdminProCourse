import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  UsuarioService,
          SettingsService,
          SharedService,
          SidebarService} from './service.index';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UsuarioService,
    SettingsService,
    SharedService,
    SidebarService
  ],
  declarations: []
})
export class ServiceModule { }
