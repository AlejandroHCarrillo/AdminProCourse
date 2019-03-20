import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  LoginGuardGuard,
          UsuarioService,
          SettingsService,
          SharedService,
          SidebarService,
          SubirArchivoService
        } from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    UsuarioService,
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
