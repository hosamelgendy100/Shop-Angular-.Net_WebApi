import { CategoryService } from './../../../service/category/category.service';
import { ProductService } from './../../../service/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy {
isAlive: boolean=true;
productList
categoryList
private categoryId: string


  constructor
  (
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { 

    this.activatedRoute.queryParamMap.subscribe(params=>{
     this.categoryId= params.get("category");
    });
    
    console.log(this.categoryId);
    if(this.categoryId)
    {
      this.productService.getProductByCategory(this.categoryId).takeWhile(()=> this.isAlive)
      .subscribe(response=>{
        this.productList=response.json();
      })
    }

    this.productService.getallProducts().takeWhile(()=>this.isAlive).
    subscribe(response=>{
      this.productList=response.json();
      // console.log(this.productList);
    });
    this.categoryService.GetCategory().takeWhile(()=>this.isAlive).
    subscribe(response=>{
      this.categoryList=response.json();
    });
  //  console.log(this.categoryList$);
  }

  ngOnDestroy()
  {
    this.isAlive= false;
  }
  ngOnInit() {
  }

  GetCategory()
  {
    
  }

}
