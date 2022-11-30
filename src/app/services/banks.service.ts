import { Injectable } from "@angular/core";
import { GLOBAL } from './global'
import { HttpClient } from "@angular/common/http";
import { Banks } from "../models/banks";

@Injectable()
export class BanksService {
    public url: string;
    public urlBanks: string;


    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url
        this.urlBanks = GLOBAL.urlBanks
    }

    getBanks(){
       return this._http.get<any>(this.urlBanks);
    }
   
}
