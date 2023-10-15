import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, pipe } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(public appState:AppStateService,public loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // this.appState.setProductState({
    //   status : 'LOADING'
    // })

    this.loadingService.showLoading();


    return next.handle(request).pipe(
      finalize(() => {
      //   this.appState.setProductState({
      //     status : 'LOADED'
      // })

      this.loadingService.hideLoading();

    }));
  }
}
