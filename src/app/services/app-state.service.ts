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

  public authState:any = {
    isAuthenticated : false,
    username :undefined,
    roles : undefined,
    token : undefined
  }
  

  constructor() { }

  public setProductState(state:any){
     this.productsState = {...this.productsState,...state}
  }

  public setAuthState(state:any){
    this.authState={...this.authState,...state};
  }



 
}
 