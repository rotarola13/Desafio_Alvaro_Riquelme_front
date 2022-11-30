import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
public register=false;
public user: User;
public identity: any;
public token: any;
public errorMessage: any;

constructor(private _userService: UserService) {
  this.user = new User('', '', '', '', 'ROLE_USER', '', 0);
}
ngOnInit(): void {
  this.identity = this._userService.getIdentity()
  this.token= this._userService.getToken();
}

public crearCuenta(){
 
  this.register=true;
}

public onSubmit() {
  this._userService.signUp(this.user,false).subscribe(
    response => {
      let identity = response.user;
      this.identity = identity;

      if (!this.identity._id) {
        alert('El usuario no esta correctamente identificado')
      } else {
        //crear elemento en el localstorage
        localStorage.setItem('identity',JSON.stringify(identity));
        this._userService.signUp(this.user,true).subscribe(
          response => {
            let token = response.token;
            this.token = token;

            if (this.token.length <= 0) {
              alert('El token no se ha generado')
            } else {
              //crear elemento en el localstorage
              localStorage.setItem('token',token);
              console.log(this.token);
              //token
            }
          },
          error => {
            var errorMessage = <any>error.error.message;
            if (errorMessage != null) {
              this.errorMessage = error.error.message
              //console.log(errorMessage);
            }
          }
        );
        //token
      }
    },
    error => {
      var errorMessage = <any>error.error.message;
      if (errorMessage != null) {
        this.errorMessage = error.error.message
        //console.log(errorMessage);
      }
    }
  );
}

logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
  localStorage.clear();
  this.identity=null;
  this.token=null;

}

}
