import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit,OnDestroy {
product ={};
submitbuttonText :string ="Create";
delete:string
ProductId;
IsAlive:boolean=true;

  constructor(
    private route:Router,
    private activatedRouter:ActivatedRoute,
    private productService:ProductService
  ) { 
    
   this.ProductId= this.activatedRouter.snapshot.queryParamMap.get("id"); 
    if(this.ProductId)
    {
      this.submitbuttonText="Update";
      this.delete="delete";
     this.productService.getProductById(this.ProductId).take(1).
      subscribe(response=>{        
        this.product=response.json();        
      });
    }

  }

  ngOnInit() {
  }
  ngOnDestroy()
  {
    this.IsAlive= false;
  }
  Products(formData)
  {
    console.log(this.ProductId);
    if(this.ProductId)
    {
      this.UpdateProduct(formData);
    }
    else
    {
      this.Save(formData);
    }
  }

  Save(formData)
  {
      //Calls the Service to store the result
     this.productService.saveProduct(formData).takeWhile(()=>this.IsAlive).
     subscribe(response=>{
       console.log("save");
     });
     this.route.navigate(['/product']);
  }

  UpdateProduct(formData)
  {
     this.productService.updateProduct(formData,this.ProductId).takeWhile(()=> this.IsAlive)
     .subscribe();
     this.route.navigate(['/product']);
  }

  DeleteProduct()
  {
    this.productService.deleteProduct(this.ProductId).takeWhile(()=>this.IsAlive)
    .subscribe();
    this.route.navigate(['/product']);
    
  }

}
