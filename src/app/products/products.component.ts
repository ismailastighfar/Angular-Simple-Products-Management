
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{



  constructor(private ps:ProductService,private router:Router,public appState:AppStateService) {
  }

    ngOnInit(){
     this.getProducts()
    }

    getProducts(){
      // this.appState.setProductState({
      //   status : "LOADING"
      // })
      this.ps.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,
        this.appState.productsState.pageSize)
      .subscribe({
        next:resp =>{
          let products= resp.body as Product[]
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!)
          let totalCount = totalProducts ;
          let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize)
          if(totalProducts % this.appState.productsState.pageSize != 0){
            totalPages++;
          }
          this.appState.setProductState({
            products,totalCount,totalPages,
            status : "LOADED"
          })
        },
        error:err=> {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage : err
          })
         
        }
      }

      )
    }



  handleCheckProduct(product: Product) {

    this.ps.checkProduct(product)
      .subscribe({
        next:updatedProduct=>{
          product.checked=!product.checked;
        }
      })
  }

  handelEdit(product: Product){
       this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }

  handeldelete(product: Product) {
    if(confirm("are you sure ?!"))
    this.ps.deleteProduct(product).subscribe({
      next:data=>{
        // this.appState.productsState.products = this.appState.productsState.products.filter((p:any)=>p.id!=product.id)
        this.getProducts()
      }
    })
    }

    handleGoToPage(page:number){
      this.appState.productsState.currentPage=page;
      this.getProducts()
    }


}
