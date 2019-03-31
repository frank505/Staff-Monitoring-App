import { Injectable } from '@angular/core';
import {CanActivate } from '@angular/router';
import { AuthenticationServiceService } from "./authentication-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {


  constructor(private AuthService:AuthenticationServiceService) { }

  
  canActivate(): boolean {
   return this.AuthService.isAuthenticated();
  }

   

}
