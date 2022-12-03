import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  @Output() logOut = new EventEmitter<boolean>();
  destinatario:  boolean=false;
  bModuloTransferencia: boolean=false;
  historico: any=false;
  header:boolean=true;  

  constructor(private _userService: UserService, public snackbar: SnackbarComponent) {    
  }

  ngOnInit(): void {    
    if (localStorage.getItem('SessionExpired')=='true') {
      setTimeout(() => {
        this.logout();
        localStorage.setItem('SessionExpired','false');  
      }, 0);     
    }
  } 

  logout(){
    this.logOut.emit(true);
  }

  moduloDestinatrio(){
    this.header=false;
    this.destinatario=true
    this.bModuloTransferencia=false;
    this.historico=false;
  }

  moduloTransferencia(){
    this.header=false;
    this.destinatario=true
    this.bModuloTransferencia=true;
    this.historico=false;
  }

  closeModuloDestinatario(){
    this.header=true;
    this.destinatario=false;
  }
  closeModuloHistorico(event:any){
    this.header=true;
    this.historico=event;
  }

  moduloHistorico(){
    this.header=false;
    this.historico=true;
    this.destinatario=false;
  }

  sessionExp(){
    localStorage.setItem('SessionExpired','true');    
  }
}
