import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm! : FormGroup;

  constructor(private fb : FormBuilder,private ps:ProductService){}

  ngOnInit() {
      this.productForm=this.fb.group({
        name : this.fb.control('',[Validators.required]),
        price : this.fb.control(0,[Validators.min(1000),Validators.required]),
        checked : this.fb.control(false)
      });
  }


  saveProduct(){
    let product = this.productForm.value;
    this.ps.saveProduct(product).subscribe({
      next : value=>{
        alert(JSON.stringify(value))
      },
      error(err) {
          console.log(err)
      }
    });
  }

}
