import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { AppStateService } from '../services/app-state.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CustomerModalAlertComponent } from '../customer-modal-alert/customer-modal-alert.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm! : FormGroup;

  constructor(private fb : FormBuilder,private ps:ProductService,private appState:AppStateService, private modalService: NgbModal){}

  ngOnInit() {
      this.productForm=this.fb.group({
        name : this.fb.control('',[Validators.required,Validators.minLength(4)]),
        price : this.fb.control(0,[Validators.min(1000),Validators.required]),
        checked : this.fb.control(false)
      });
  }


  saveProduct(){
    let product = this.productForm.value;
    this.ps.saveProduct(product).subscribe({
      next : data=>{
        this.appState.setProductState({status:"LOADED", errorMessage:""});
        const modalRef = this.modalService.open(CustomerModalAlertComponent);
        modalRef.componentInstance.title = 'Product saved successfully';
        modalRef.componentInstance.message = data;
        modalRef.componentInstance.action="close";
      },
      error:err=>{
        this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
      }
    });
  }

  getErrorMessage(name: string, errors: ValidationErrors):string {
    if(errors['required']){
      return name + " is Required";
    } else if (errors['minlength']){
      return name +" should have at least "+errors['minlength']['requiredLength']+" Characters";
    } else if (errors['min']){
      return name +" should have at least 1000 dh ";
    } 
    else return "";
  }

}
