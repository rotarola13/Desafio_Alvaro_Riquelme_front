import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Banks } from 'src/app/models/banks';
import { Destinatario } from 'src/app/models/destinatario';
import { BanksService } from 'src/app/services/banks.service';
import { UserService } from 'src/app/services/user.service';
import { validate, clean, format, getCheckDigit } from 'rut.js'

@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.css'],
  providers: [BanksService, UserService]
})
export class DestinatarioComponent implements OnInit {
  @Input() moduloTransferencia: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  public destinatario: Destinatario;
  public montoTransferencia: number = 0;
  tipoCuentasBanco: any;
  banks: any;
  errorMessage: any;

  public destinatarioCard: any = [];
  moduloRealizaTransferencia: boolean = false;
  detalleDestinatario: any;


  constructor(private _banksService: BanksService, private _userService: UserService) {
    this.destinatario = new Destinatario('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this._banksService.getBanks().subscribe(
      response => {
        this.banks = response.banks;
      }
    );

    this._userService.getTipoCuenta().subscribe(
      response => {
        this.tipoCuentasBanco = response.tipoCuenta;
      }
    );

    this._userService.getDestinatarios().subscribe(
      response => {
        this.destinatarioCard = response.destinatario;
      }
    );
  }

  cerrarDestinatario() {
    this.close.emit(false);
  }

  public onSubmit() {

    this._userService.registrarDestinatario(this.destinatario).subscribe(
      response => {

        if (!response.destinatario._id) {
          //alerta que no se ha registrado
        } else {
          this.cerrarDestinatario();

        }
      },
      error => {
        var errorMessage = <any>error.error.message;
        if (errorMessage != null) {
          this.errorMessage = error.error.message
          //console.log(errorMessage);
        }
      }
    );
  }

  validarRUT() {
    let valid = validate(this.destinatario.rut);
    console.log(valid);
  }

  realizarTransferencia(destinatario: any) {
    this.detalleDestinatario = destinatario;
    this.moduloRealizaTransferencia = true;
  }

  volverDestinatario() {
    this.moduloRealizaTransferencia = false;
    this.moduloTransferencia = true;
  }

  saveTransferencia() {

  }
}
