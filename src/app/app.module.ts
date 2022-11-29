import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
// import { RegistroComponent } from './components/registro/registro.component';
// import { DestinatarioComponent } from './components/destinatario/destinatario.component';
// import { HistoricoComponent } from './components/historico/historico.component';
// import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DestinatarioComponent,
    // RegistroComponent,
    // HistoricoComponent,
    // TransferenciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
