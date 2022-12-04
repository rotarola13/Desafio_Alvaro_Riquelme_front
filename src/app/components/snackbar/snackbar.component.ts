import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})

export class SnackbarComponent implements OnInit {

  timeOut = 3000;

  constructor(
    public snackBar: MatSnackBar
  ) { }


  openSnackBar(message: string, action: string) {
    setTimeout(() => {

      this.snackBar.open(message, action, {
        duration: this.timeOut,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'       
      });

    })
  }

  ngOnInit() {
  }

}
