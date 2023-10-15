import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private host : string = "http://localhost:8088"
 

  constructor(private http:HttpClient) { }


  getProductById(productId: number) :Observable<Product> {

    return this.http.get<Product>(`${this.host}/products/${productId}`)
    
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.host}/products`,product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }

  public getProducts(kayword:string="",page:number=1,size:number=2){
    return this.http.get
    (`${this.host}/products?name_like=${kayword}&_page=${page}&_limit=${size}`,{observe:'response'})
  }

  // public searchProducts(kayword:string,page:number=1,size:number=2){
  //   return this.http.get<Array<Product>>(`http://localhost:8088/products?name_like=${kayword}&_size=${page}&_limit=${size}`)
  // }

  public checkProduct(product:Product){
    return this.http.patch(`${this.host}/products/${product.id}`,
    {checked:!product.checked})
  }

  public deleteProduct(product:Product){
    return this.http.delete(`${this.host}/products/${product.id}`)
  }
}
