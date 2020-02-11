import { GenericError } from './../../common/error/GenericError';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {_throw} from 'rxjs/observable/throw';
import { NotFound404 } from '../../common/error/404NotFound';


@Injectable()
export class ProductService {
 url:string="http://localhost:49059/api/";
 options;
  constructor(private product:Http) {
    const header= new Headers();
    header.append("Content-Type","application/json");
   this.options=new RequestOptions({headers:header});
   }


  getallProducts()
  {
     return this.product.get(this.url+'Product/').
      catch((error:Response)=>
        {
           if(error.status == 404)
           {
             return _throw(new NotFound404(error))
           }
           else
           {
             return _throw(new GenericError());
           }
        });
  }

  saveProduct(productSave)
  {
    return this.product.post(this.url + 'Product/',JSON.stringify(productSave),this.options).
        catch((error:Response)=>
        {
          if(error.status == 404)
          {
             return _throw(new NotFound404(error));
          }
          else
          {
             return _throw(new GenericError());
          }
        })
  }

  updateProduct(ProductData,id)
  {
    return this.product.put(this.url+'Product/'+ id, JSON.stringify(ProductData),this.options)
  }

  deleteProduct(id)
  {
    return this.product.delete(this.url+'Product/'+ id,this.options).
      catch((error:Response)=>
      {
        if(error.status == 404)
        {
           return _throw(new NotFound404(error));
        }
        else
        {
           return _throw(new GenericError());
        }
      });

  }


  getProductById(id:string)
  {
     return this.product.get(this.url +'Product/'+ id).
      catch((error:Response)=>
        {
          if(error.status==404)
          {
            return _throw(new NotFound404(error));
          }
          else
          {
            return _throw(new GenericError());
          }
        }
    )
  }

  getProductByCategory(id:string)
  {
     return this.product.get(this.url +'categorybyName?Category='+ id).
      catch((error:Response)=>
        {
          if(error.status==404)
          {
            return _throw(new NotFound404(error));
          }
          else
          {
            return _throw(new GenericError());
          }
        }
    )
  }

}
