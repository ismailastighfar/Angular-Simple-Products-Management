import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public loading =this.loadingService.isLoading$;

  constructor(public appState:AppStateService, public loadingService:LoadingService,
              private route:Router
    ){}

  actions : Array<any> = [
    {title:"Home",route:"/admin/home",icon:"house"},
    {title:"Products",route:"/admin/products",icon:"amazon"},
    {title:"New Product",route:"/admin/newProduct",icon:"newspaper"}
  ];
  currentAction:any;

  setCurrentAction(action: any) {
   this.currentAction = action;
  }

  logout() {
    this.appState.authState={};
    this.route.navigateByUrl("/login");
  }

  login() {
    this.route.navigateByUrl("/login");
  }
}
