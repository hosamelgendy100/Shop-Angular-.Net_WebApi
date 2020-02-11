import { Injectable } from '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http'

@Injectable()
export class CategoryService {

  private url:string = "http://localhost:49059/api/Category"; 

  constructor( private category:Http) { 

  }

  GetCategory()
  {
    return this.category.get(this.url);
  }

}
