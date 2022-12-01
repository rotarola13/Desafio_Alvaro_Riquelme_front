import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() logOut = new EventEmitter<boolean>();
  destinatario:  boolean=false;
  bModuloTransferencia: boolean=false;

  logout(){
    this.logOut.emit(true);
  }

  moduloDestinatrio(){
    this.destinatario=true
    this.bModuloTransferencia=false;
  }

  moduloTransferencia(){
    this.destinatario=true
    this.bModuloTransferencia=true;
  }

  closeModuloDestinatario(){
    this.destinatario=false;
  }
}
