import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';
import { HttpService } from "./http.service";
import {HttpHeaders} from '@angular/common/http';
const ADMIN_TOKEN = "JodHRwOlwvXC9sb2";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  authenticationState = new BehaviorSubject(false);
  constructor(private storage:Storage,private plt:Platform,
    private http:HttpService,private loadingController:LoadingController) { }

login(key)
{
  return this.storage.set(ADMIN_TOKEN,'Bearer '+key).then(res=>{
    this.authenticationState.next(true);
  })
}

returnTokenPlaceholder()
{
  return ADMIN_TOKEN;
}

logout()
{
  return this.storage.remove(ADMIN_TOKEN).then(()=>{
    this.authenticationState.next(false);
  
    })
}


ForgotPassword(ForgotPasswordDetails)
{
  return this.http.postData(ForgotPasswordDetails,"/admin/reset-password-link");
}

async checkToken()
{
  await this.storage.get(ADMIN_TOKEN).then(async (res)=>{
   if(res){

  if(res!==null){
    this.authenticationState.next(true);
  }else{
    this.authenticationState.next(false);
  }
   }
   
  })
}


isAuthenticated()
{
  return this.authenticationState.value;
}


}
