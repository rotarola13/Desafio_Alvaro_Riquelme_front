import { Injectable } from "@angular/core";
import { GLOBAL } from './global'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Parser } from "@angular/compiler";

@Injectable()
export class TransferenciaService {
    public url: string;
    identity: any;
    token: any;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url
    }

    registrarDestinatario(destinatario: any){
      

        let json = JSON.stringify(destinatario);
        let params = json;
    
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.post<any>(this.url +'registerDestinatario',params,{headers: headers});
    }
    
    getTipoCuenta(){      
    
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.get<any>(this.url +'getTipoCuenta',{headers: headers});
    }
    
    
    getDestinatarios(){
      
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.get<any>(this.url +'getDestinatarios',{headers: headers});
    }
    
    saveTransferencia(user: any){      
    
        let json = JSON.stringify(user);
        let params = json;
    
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.post<any>(this.url +'transferencia',params,{headers: headers});
    }  

    saveHistoricoTransferencia(historico: any){      
    
        let json = JSON.stringify(historico);
        let params = json;
    
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.post<any>(this.url +'historico',params,{headers: headers});
    }  

    getToken(){
        let token = localStorage.getItem('token');

        if (token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
            
        }
        return this.token;

    }    

    getHistorico(){
      
        let headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':this.getToken()});
    
        return this._http.get<any>(this.url +'historicoFind',{headers: headers});
    }


}

