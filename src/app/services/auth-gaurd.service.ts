import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpService } from './http.service';
import { AuthenticationServiceService } from "./authentication-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {


  getStoredItem:any;
  constructor(public router: Router,public http: HttpService,private AuthService:AuthenticationServiceService) { }

  
  canActivate(): boolean {
   return this.AuthService.isAuthenticated();
  }

   

}
