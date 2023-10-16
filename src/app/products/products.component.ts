
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { CustomerModalAlertComponent } from '../customer-modal-alert/customer-modal-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{



  constructor(private ps:ProductService,private router:Router,public appState:AppStateService,
    private modalService: NgbModal) {
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
    this.appState.productsState.status="LOADING";
    let modalRef=this.modalService.open(CustomerModalAlertComponent);
      modalRef.componentInstance.title="are you sure ?!";
      modalRef.componentInstance.action="yes";

      modalRef.result.then((data) => {
        this.ps.checkProduct(product)
        .subscribe({
          next:data=>{
            let prods = this.appState.productsState.products.map((p:any)=>p.id===product.id?data:p);
            this.appState.setProductState({products:prods,status:"LOADED", errorMessage:""});
          },
          error : (err)=>{
            this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
          }
        })
      },
      (error) => {
        console.log(error)
        this.getProducts()
      });
   
  }

  handelEdit(product: Product){
       this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }

  handeldelete(product: Product) {
    this.appState.productsState.status="LOADING";

    // if(confirm("Etes vous sûre?"))
      let modalRef=this.modalService.open(CustomerModalAlertComponent);
      modalRef.componentInstance.title="are you sure ?!";
      modalRef.componentInstance.action="yes";

      modalRef.result.then((close) => {
        this.ps.deleteProduct(product).subscribe({
          next:data=>{
            let products = this.appState.productsState.products.filter((p:any)=>p.id!==product.id);
            if(products.length==0 ){
              --this.appState.productsState.currentPage;
              if(this.appState.productsState.currentPage==0){
                this.appState.productsState.currentPage=1;
              }
              this.getProducts()
            } else{
              let totalCount=this.appState.productsState.totalCount-1;
              this.appState.setProductState({products, totalCount,status:"LOADED", errorMessage:""});
            }
          },
          error : (err)=>{
            this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
          }
        })
      },
      (error) => {
        console.log(error)
        this.getProducts()
      });
      
   
    }

    handleGoToPage(page:number){
      this.appState.productsState.currentPage=page;
      this.getProducts()
    }


}
