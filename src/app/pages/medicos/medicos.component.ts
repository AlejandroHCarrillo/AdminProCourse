import { UsuarioService } from './../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../components/modal-upload/modal-upload.service";
import { MedicoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Medico } from "src/app/models/medico.model";
import * as swal from "sweetalert";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("medicos", id);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService
      .cargarMedicos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarMedicos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarMedicos();
    }
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._medicoService
      .buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        // console.log(medicos);
        this.totalRegistros = medicos.length;
        this.medicos = medicos;
      });
    this.cargando = false;
  }

  borrarMedico(id: string) {
    // console.log(id);
    swal({
      title: "¿Estas seguro de eliminar a este medico?",
      text: "Una vez eliminado no es posible recuperar al medico",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._medicoService.borrarMedico(id).subscribe(resp => {
          // console.log(resp);
          this.cargarMedicos();
        });
      } else {
        swal(
          "El medico no fue eliminado",
          "El medico no ha sido eliminado"
        );
        // alert("El medico no fue eliminado");
      }
    });
  }

  crearMedico(nombre: string) {
    swal( "Nombre del medico:", { 
      content: 'input' })!
      .then(value => {
      // swal(`You typed: ${value}`);
      let medico = new Medico();
      medico.nombre = value;
      medico.hospital = "";
      medico.usuario =  this._usuarioService.usuario._id;

      this._medicoService.crearMedico(medico).subscribe(resp => {
        console.log(resp);
        this.cargarMedicos();
      });
    });
  }

  guardarMedico(medico: Medico) {
    medico.usuario =  this._usuarioService.usuario._id;
    this._medicoService.actualizarMedico(medico).subscribe(resp => {
      console.log(resp);
    });
  }
}
