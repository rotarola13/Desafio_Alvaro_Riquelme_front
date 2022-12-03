import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Historico } from 'src/app/models/historico';
import { GLOBAL } from 'src/app/services/global';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  providers: [TransferenciaService]
})
export class HistoricoComponent implements OnInit,AfterViewInit {
  @Output() close = new EventEmitter<boolean>();  
  @Output() sessionExpired = new EventEmitter<boolean>();
  
  displayedColumns: string[] = ['nombredestinatario', 'rut', 'banco', 'tipocuenta', 'monto'];
  datahist: any;
  dataSource = new MatTableDataSource<any>([]);
  global:any
  public spinner:any=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  user: any;
  
  constructor(private _userService: UserService,
    private _transferenciaService: TransferenciaService, 
    public snackbar: SnackbarComponent) {
    this.global =GLOBAL; 
  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }

  ngOnInit(){
    this.user = this._userService.getIdentity();
    this.spinner=true;
    this._transferenciaService.getHistorico( this.user._id).subscribe(
      response => {
          console.log(response.historico.length);
        if (response.historico.length >= 1) {
           //this.dataHistorico = response.historico;        
        this.dataSource.data=response.historico;
        this.datahist = response.historico.length;
        console.log(response.historico);
        } else {
          this.snackbar.openSnackBar(this.global.noHistoryAvailable, 'Close');          
        }  
        this.spinner=false;     
      },
      error => {
        if (error.status = 401) {
          this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
          this.sessionExpired.emit(true);
        } else {
          this.snackbar.openSnackBar(error.error.message, 'Close');
        }
        this.spinner=false; 
      }
    );
  }


  

  cerrarDestinatario() {
    this.close.emit(false);
  }


}
