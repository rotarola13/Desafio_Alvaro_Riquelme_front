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
    this.destinatario=true
    this.bModuloTransferencia=false;
    this.historico=false;
  }

  moduloTransferencia(){
    this.destinatario=true
    this.bModuloTransferencia=true;
    this.historico=false;
  }

  closeModuloDestinatario(){
    this.destinatario=false;
  }
  closeModuloHistorico(event:any){
    this.historico=event;
  }

  moduloHistorico(){
    this.historico=true;
  }

  sessionExp(){
    localStorage.setItem('SessionExpired','true');    
  }
}
