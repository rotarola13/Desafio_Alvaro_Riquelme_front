export class Destinatario{
    constructor(
        public _id:string,
        public name:string,
        public rut:string,
        public email:string,
        public telefono:string,
        public bancoDestino:string,
        public tipoCuenta:string,
        public numeroCuenta:string,
        public user?:string
        
    ){}
}