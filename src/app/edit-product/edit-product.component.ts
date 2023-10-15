import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId! : number;
  public productForm! : FormGroup;

  constructor(private route:ActivatedRoute,private ps:ProductService,private fb : FormBuilder){

  }

  ngOnInit() {
      this.productId = this.route.snapshot.params['id'];
      this.ps.getProductById(this.productId).subscribe({
        next: product =>{

          this.productForm=this.fb.group({
            id : this.fb.control(product.id),
            name : this.fb.control(product.name,[Validators.required]),
            price : this.fb.control(product.price,[Validators.min(1000),Validators.required]),
            checked : this.fb.control(product.checked)

        })},
        error : error =>{
          console.log(error)
        }
      })
  }

  updateProduct(){
    let product:Product = this.productForm.value;
    this.ps.updateProduct(product).subscribe({
      next : data=>{
        alert(JSON.stringify(data));
      }
    })
  }

}
