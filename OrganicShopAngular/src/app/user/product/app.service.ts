import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

import { DatatableSortType } from "ng2-md-datatable";
import { IPaginableProduct, IPagination, IProduct } from "./app.interfaces";


@Injectable()
export class AppService {

private url:string ="http://localhost:49059/api/Product";
productList:IProduct[];
tshirts:IPaginableProduct

constructor(private productAPI:Http){
  // this.getProductList();

}

getProductList(
  page: number,
  limit: number,
  sortBy?: string,
  sortType?: DatatableSortType
)
{
 return this.productAPI.get(this.url).toPromise()
  .then(response=>{  
    this.productList= response.json();    
    }  
  );  
  
}

  getDemoDatasource(
    page: number,
    limit: number,
    sortBy?: string,
    sortType?: DatatableSortType
  ): IPaginableProduct {

    const offset = (page - 1) * limit; 
    let product;
    if (sortBy) {
      product =this.productList
        .sort((product1: IProduct, product2: IProduct) => {
          switch (sortType) {
            case 0:
            case 1:
              return typeof product1[sortBy] === "number"
                ? product1[sortBy] - product2[sortBy]
                : String.prototype.localeCompare.call(
                    product1[sortBy],
                    product2[sortBy]
                  );
            case 2:
              return typeof product1[sortBy] === "number"
                ? product2[sortBy] - product1[sortBy]
                : String.prototype.localeCompare.call(
                    product2[sortBy],
                    product1[sortBy]
                  );
          }
        })
        .slice(offset, offset + limit);
    } 
    else {
      product = this.productList.slice(offset, offset + limit);
    }

    return {
      product,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalCount: this.productList.length
      } as IPagination
    };
  }
};