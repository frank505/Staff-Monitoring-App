import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ToastService} from '../../services/toast.service';
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-staff-login-details',
  templateUrl: './staff-login-details.page.html',
  styleUrls: ['./staff-login-details.page.scss'],
})
export class StaffLoginDetailsPage implements OnInit {


 response:any;
 loaded:boolean = false;


  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,private storage:Storage,private alert:AlertService) { 
  this.getDailyLoginDetails();
  }

  ngOnInit() {
  }
 //  get-daily-login-details
 getDailyLoginDetails()
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.loaded = false;
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'login details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
        this.http.getData("/admin/get-daily-login-details",token).subscribe(subscribed_data=>{
        console.log(subscribed_data);
        this.response = subscribed_data;
        this.loaded = true;
        loading.dismiss();
        },
        error =>{
          loading.dismiss();
          console.log(error);
        this.alert.presentAlert("error","login error","an error occured trying to load your login details");
  
        }
        
        
        )
   
      })
       
    });
 }

 doRefresh($event)
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.loaded = false;
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'login details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
        this.http.getData("/admin/get-daily-login-details",token).subscribe(subscribed_data=>{
        console.log(subscribed_data);
        this.response = subscribed_data;
        this.loaded = true;
        loading.dismiss();
        $event.target.complete();
        },
        error =>{
          loading.dismiss();
          console.log(error);
          $event.target.complete();
        this.alert.presentAlert("error","login error","an error occured trying to load your login details");
  
        }
        
        
        )
   
      })
       
    });
 }
}
