import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;

  constructor( public _usuarioService: UsuarioService ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }


  guardar( fdata: Usuario ){
    console.log(fdata);
    this.usuario.nombre = fdata.nombre;
    if (!this.usuario.google)
    this.usuario.email = fdata.email;

    this._usuarioService.actualizarUsuario( this.usuario )
    .subscribe( resp => {
      console.log(resp);
    })

  }

  seleccionarImagen(archivo){
    if(!archivo){
    this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    console.log(archivo);
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
