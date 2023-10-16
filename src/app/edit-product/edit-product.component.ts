import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { AppStateService } from '../services/app-state.service';
import { CustomerModalAlertComponent } from '../customer-modal-alert/customer-modal-alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId! : number;
  public productForm! : FormGroup;

  constructor(private route:ActivatedRoute,private ps:ProductService,
    private fb : FormBuilder,private appState:AppStateService,private modalService: NgbModal){

  }

  ngOnInit() {
      this.productId = this.route.snapshot.params['id'];
      this.appState.productsState.status="LOADING";
      this.ps.getProductById(this.productId).subscribe({
        next: product =>{
          this.appState.setProductState({status:"LOADED", errorMessage:""});
          this.productForm=this.fb.group({
            id : this.fb.control(product.id),
            name : this.fb.control(product.name,[Validators.required, Validators.minLength(4)]),
            price : this.fb.control(product.price,[Validators.min(1000),Validators.required]),
            checked : this.fb.control(product.checked)

        })},
        error : err =>{
          this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
        }
      })
  }

  updateProduct(){
    let product:Product = this.productForm.value;
    this.ps.updateProduct(product).subscribe({
      next : data=>{
        this.appState.setProductState({status:"LOADED", errorMessage:""});
        let modalRef=this.modalService.open(CustomerModalAlertComponent);
        modalRef.componentInstance.title="Product updated successfully";
        modalRef.componentInstance.message=data;
        modalRef.componentInstance.action="close";
      },
      error : (err)=>{
        this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
      }
    })
  }

  getErrorMessage(name: string, errors: ValidationErrors):string {
    if(errors['required']){
      return name + " is Required";
    } else if (errors['minlength']){
      return name +" should have at least "+errors['minlength']['requiredLength']+" Characters";
    }  else if (errors['min']){
      return name +" should have at least 1000dh ";
    }
      else return "";
  }

}
