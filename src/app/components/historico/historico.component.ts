import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportData } from 'src/app/models/exportData';
import { ExportService } from 'src/app/services/export.service';
import { GLOBAL } from 'src/app/services/global';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  providers: [TransferenciaService]
})
export class HistoricoComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() sessionExpired = new EventEmitter<boolean>();

  displayedColumns: string[] = ['nombredestinatario', 'rut', 'banco', 'tipocuenta', 'monto'];
  datahist: any;
  dataSource = new MatTableDataSource<any>([]);
  global: any
  public spinner: any = false;
  public exportDataExcel: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  user: any;

  constructor(private _userService: UserService,
    private _transferenciaService: TransferenciaService,
    public snackbar: SnackbarComponent,
    private _export: ExportService) {
    this.global = GLOBAL;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.user = this._userService.getIdentity();
    this.spinner = true;
    this._transferenciaService.getHistorico(this.user._id).subscribe(
      response => {

        if (response.historico.length >= 1) {
          this.dataSource.data = response.historico;
          this.datahist = response.historico.length;         
        } else {
          this.snackbar.openSnackBar(this.global.noHistoryAvailable, 'Close');
        }
        this.spinner = false;
      },
      error => {
        if (error.status = 401) {
          this.snackbar.openSnackBar(this.global.sessionExpired, 'Close');
          this.sessionExpired.emit(true);
        } else {
          this.snackbar.openSnackBar(error.error.message, 'Close');
        }
        this.spinner = false;
      }
    );
  }

  exportexcel() {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.dataSource.data.forEach(x => {
      let formattedDate = datepipe.transform(x.fechaTransferencia, 'dd-MM-YYYY HH:mm:ss');
      let data = new ExportData(x.name, x.rut, x.bancoDestino, x.tipoCuenta.description, x.monto, formattedDate?.toString());
      this.exportDataExcel.push(data);
    });
    this._export.exportExcel(this.exportDataExcel, 'History');
  }

  cerrarDestinatario() {
    this.close.emit(false);
  }


}
