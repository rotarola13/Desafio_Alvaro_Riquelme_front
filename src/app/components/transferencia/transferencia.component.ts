import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Banks } from 'src/app/models/banks';
import { Destinatario } from 'src/app/models/destinatario';
import { BanksService } from 'src/app/services/banks.service';
import { UserService } from 'src/app/services/user.service';
import { validate, clean, format, getCheckDigit } from 'rut.js'
import { User } from 'src/app/models/user';
import { Historico } from 'src/app/models/historico';

import { SnackbarComponent } from '../snackbar/snackbar.component';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css'],
  providers: [BanksService, UserService, TransferenciaService]
})
export class TransferenciaComponent implements OnInit {
  @Input() moduloTransferencia: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() sessionExpired = new EventEmitter<boolean>();

  public destinatario: Destinatario;
  public montoTransferencia: number = 0;
  tipoCuentasBanco: any;
  banks: any;
  errorMessage: any;

  public destinatarioCard: any = [];
  moduloRealizaTransferencia: boolean = false;
  detalleDestinatario: any;
  valid: boolean = false;
  user: any;
  validMax: any = false;
  global: any;
  public spinner:any=false;


  constructor(private _banksService: BanksService, private _userService: UserService,
    private _transferenciaService: TransferenciaService, public snackbar: SnackbarComponent) {
    this.destinatario = new Destinatario('', '', '', '', '', '', '', '');
    this.global = GLOBAL;
  }

  ngOnInit(): void {
    this.spinner=true;
    this.user = this._userService.getIdentity();

    this._banksService.getBanks().subscribe(
      response => {
        this.banks = response.banks;
      }
    );

    this._transferenciaService.getTipoCuenta().subscribe(
      response => {
        this.tipoCuentasBanco = response.tipoCuenta;
      },
      error => {
        if (error.status = 401) {
          this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
          this.sessionExpired.emit(true);
        } else {
          var errorMessage = <any>error.error.message;
          if (errorMessage != null) {
            this.errorMessage = error.error.message
            this.snackbar.openSnackBar(error.error.message, 'Close');
            //console.log(errorMessage);
          }
        }
        this.spinner=false;
      }
    );


    this._transferenciaService.getDestinatarios(this.user._id).subscribe(
      response => {
        this.destinatarioCard = response.destinatario;
        this.spinner=false;
      },
      error => {
        if (error.status = 401) {
          this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
          this.sessionExpired.emit(true);
        } else {
          var errorMessage = <any>error.error.message;
          if (errorMessage != null) {
            this.errorMessage = error.error.message
            this.snackbar.openSnackBar(error.error.message, 'Close');
            //console.log(errorMessage);
          }
        }
        this.spinner=false;

      }
    );
  }

  cerrarDestinatario() {
    this.close.emit(false);
  }

  public onSubmit() {
    this.spinner=true;
    this.valid = this.validarRUT(this.destinatario.rut);
    if (!this.valid) {
      console.log(this.destinatario);
      this.snackbar.openSnackBar(this.global.invalidRUT, 'Close');
      this.spinner=false;
    }
    else {
      this.destinatario.user =this.user._id;
      this._transferenciaService.registrarDestinatario(this.destinatario).subscribe(
        response => {
          this.spinner=false;
          this.snackbar.openSnackBar(this.global.successfullyDest, 'Close');
          this.cerrarDestinatario();
        },
        error => {
          if (error.status = 401) {
            this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
            this.sessionExpired.emit(true);
          } else {
            var errorMessage = <any>error.error.message;
            if (errorMessage != null) {
              this.errorMessage = error.error.message
              this.snackbar.openSnackBar(error.error.message, 'Close');
            }
          }
          this.spinner=false;

        }
      );
    }

  }

  validarRUT(rut: any) {
    let validRut = validate(rut);
    return validRut;
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
    this.spinner=true;
    var user = this._userService.getIdentity();
    var newSaldo = parseInt(user.saldo) - this.montoTransferencia;
    user.saldo = newSaldo;
    localStorage.setItem('identity', JSON.stringify(user));
    this._transferenciaService.saveTransferencia(user).subscribe(
      response => {

        var historico = new Historico('',
          this.detalleDestinatario.name,
          this.detalleDestinatario.rut,
          this.detalleDestinatario.bancoDestino,
          this.detalleDestinatario.tipoCuenta._id,
          this.montoTransferencia.toString(),
          this.user._id
        );

        this._transferenciaService.saveHistoricoTransferencia(historico).subscribe(
          response => {
            this.spinner=false;
            this.snackbar.openSnackBar(this.global.transferSuccessfully, 'Close');
            this.cerrarDestinatario();

          },
          error => {
            var errorMessage = <any>error.error.message;
            if (error.status = 401) {
              this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
              this.sessionExpired.emit(true);
            } else {
              if (errorMessage != null) {
                this.errorMessage = error.error.message
                this.snackbar.openSnackBar(error.error.message, 'Close');

              }
            }
            this.spinner=false;
          }
        );

      },
      error => {
        var errorMessage = <any>error.error.message;
        if (error.status = 401) {
          this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
          this.sessionExpired.emit(true);
        } else {
          if (errorMessage != null) {
            this.errorMessage = error.error.message
            this.snackbar.openSnackBar(error.error.message, 'Close');
          }
        }
        this.spinner=false;
      }
    );
  }

  validaMontoMaximo(event: any) {
    if (this.montoTransferencia > parseInt(this.user.saldo)) {
      this.validMax = false;
      this.snackbar.openSnackBar(this.global.insufficientbalance, 'Close');
    } else {
      if (this.montoTransferencia == 0) {
        this.validMax = false;
      } else {
        this.validMax = true;
      }

    }


  }
}
