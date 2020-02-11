import { GenericError } from './../../../common/error/GenericError';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/observable';
import {_throw} from 'rxjs/observable/throw';
import { NotFound404 } from '../../../common/error/404NotFound';

@Injectable()
export class LoginService {

  url="";

  constructor(private auth:Http) { 
     
  }

  Login(loginDetails)
  {
    return this.auth.post(this.url,loginDetails)
          .catch((error:Response)=>{
            if(error.status==404)
            {
              return _throw(new NotFound404(error))
            }

            return _throw(new GenericError())
          });
  }

  LoginWithGoogle()
  {

  }
}
