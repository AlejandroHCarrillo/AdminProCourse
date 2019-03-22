import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { UsuarioService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
// import * as swal from 'sweetalert';
import * from 'sweetalert';

declare var swal:any;
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService
    ) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    })



  }

  mostrarModal( id : string ){    
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
    });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarUsuarios();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarUsuarios();
    }
  }

  buscarUsuario( termino: string ){

    if (termino.length<=0){
      this.cargarUsuarios();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log(usuarios);
        this.totalRegistros = usuarios.length;
        this.usuarios = usuarios;
      });
      this.cargando = false;

  }

  borrarUsuario(usuario : Usuario ){
    // console.log(usuario);
    

    if(usuario._id === this._usuarioService.usuario._id){
      // swal('Error de eliminacion de usuario', 'No se puede borrar a si mismo', 'error');
      alert('Error de eliminacion de usuario: No se puede borrar a si mismo');
      return;
    }

    swal({
      title: '¿Estas seguro de eliminar a este usuario?',
      text: 'Una vez eliminado no es posible recuperar al usuario',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })!
    .then((borrar) => {
      // console.log(borrar);
      
      if (borrar) {
        this._usuarioService.borrarUsuario (usuario._id)
              .subscribe( resp => {
                // console.log(resp);
                this.cargarUsuarios();           
              });
      } 
      else {
        // swal("El usuario no fue eliminado", "El usuario no ha sido eliminado");
        alert("El usuario no fue eliminado");
      }
    });
  }

  guardarUsuario( usuario:Usuario ){
    this._usuarioService.actualizarUsuario (usuario)
    .subscribe( resp => {
      console.log(resp);
    });

  }

}