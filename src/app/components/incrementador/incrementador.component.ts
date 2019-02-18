import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild("txtProgress") txtProgress: ElementRef;

  @Input("title") leyenda: string = "Titulo";
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda: ',this.leyenda);
    // console.log('Progreso: ', this.progreso);
  }

  ngOnInit() {}

  onChanges(newValue: number) {
    if (newValue < 0) {
      this.progreso = 0;
    } else if (newValue > 100) {
      this.progreso = 100;
    } else {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

  }

  cambiarValor(valor: number) {
    this.progreso += valor;

    this.progreso = this.progreso < 0 ? 0 : this.progreso;
    this.progreso = this.progreso > 100 ? 100 : this.progreso;

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
