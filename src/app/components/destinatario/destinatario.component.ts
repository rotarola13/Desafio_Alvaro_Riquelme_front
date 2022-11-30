import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Banks } from 'src/app/models/banks';
import { Destinatario } from 'src/app/models/destinatario';
import { BanksService } from 'src/app/services/banks.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.css'],
  providers: [BanksService, UserService]
})
export class DestinatarioComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  public destinatario: Destinatario;
  banks: any;
  errorMessage: any;


  constructor(private _banksService: BanksService, private _userService: UserService) {
    this.destinatario = new Destinatario('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this._banksService.getBanks().subscribe(
      response => {
        this.banks = response.banks;       
      }
    );

  }

  cerrarDestinatario() {
    this.close.emit(false);
  }

  public onSubmit() {

    this._userService.registrarDestinatario(this.destinatario).subscribe(
      response => {
console.log(response);
console.log(this.destinatario);

        // if (!response.destinatario._id) {
        //   alerta que no se ha registrado
        // } else {
        //   this.cerrarDestinatario();

        // }
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
}
