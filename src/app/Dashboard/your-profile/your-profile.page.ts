import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.page.html',
  styleUrls: ['./your-profile.page.scss'],
})
export class YourProfilePage implements OnInit {

  loaded:boolean = false;
 public profile_data:any;
public user_details:any;
  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,private storage:Storage,private alert:AlertService) 
     {
      this.showProfile();
      }

  ngOnInit() {
    
  }

  
 async showProfile()
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    let current_token = {
      "token":token
    };
    const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'bubbles' })
   // console.log(header)
    loading.present().then(()=>{
      this.http.postData(current_token,"/admin/profile",token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user;
      console.log(this.profile_data.status)
      this.loaded = true;
      loading.dismiss();
      },
      error =>{
        loading.dismiss();
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");

      }
      
      
      )
 
    })
     
  });
   
 }


 




}
