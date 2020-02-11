import { GenericError } from './../../common/error/GenericError';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/auth/login/login.service';
import { NotFound404 } from '../../common/error/404NotFound';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth : LoginService) { }

  ngOnInit() {
  }

  OnSubmit(data)
  {
    console.log(JSON.stringify( data.value));
    this.auth.Login(data.value)
    .subscribe
    (response=>{
      console.log(response);
    },
    (error:GenericError)=>
    {
      // console.log(error);
      if (error instanceof NotFound404)
      {
        console.log("Something went Wrong not found");        
      }
      else
      {
        alert (error);
        console.log("Something went Wrong data");      
      }
    }
  ) ;

    console.log("formsubitted");

  }

}
