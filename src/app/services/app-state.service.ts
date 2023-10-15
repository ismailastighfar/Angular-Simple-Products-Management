import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState :any={
    products:[],
    keyword:"",
    currentPage : 1,
    pageSize:2,
    totalPages:0,
    status :"",
    totalCount : 0,
    errorMessage :""
  }
  

  constructor() { }

  public setProductState(state:any){
     this.productsState = {...this.productsState,...state}
  }
}
 