import { Component } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../services/http.service';
import { AuthenticationServiceService } from "../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
import { ToastService } from "../services/toast.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public form = {
    email:null,
    password:null
  }
  
  data_response:any;
  
  constructor(
    private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,private toast:ToastService) { }

  
 //this is a login function which is asynchronous
 async Login()
  {

  
    const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
    loading.present().then( () => {
      this.http.postData(this.form,"/admin/login").subscribe(
        data => {
          console.log(data);
          this.data_response = data;
           if(this.data_response.success == true){
               this.authService.login(this.data_response.token);
               loading.dismiss();
              
           }
          
         
        },
        error => {
          console.log(error)
          this.toast.presentToastWithOptions("invalid email or password entered");
        loading.dismiss();
        })
    })

  }




}






