import { Component, OnInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.page.html',
  styleUrls: ['./view-admin.page.scss'],
})
export class ViewAdminPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  profile_data:any;
  user_details:any;
  loaded:boolean = false;
  page:any;
  user_details_paginated_data: any;
  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private storage:Storage,private alert:AlertService) {
      this.registeredAdmins();
      }

  ngOnInit() {
  }

  registeredAdmins()
  {
    let pagination = 4;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'bubbles' })
   // console.log(header)
    loading.present().then(()=>{
      this.http.getData("/admin/all-admins/"+pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the current page on first request to be equal to the page variable 
      this.page = this.profile_data.user.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.page++; 
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

 
  loadMoreData(event)
  {
    //the number of contents we want per page is what i called pagination
    let pagination = 4;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-admins/"+pagination+"?page="+this.page,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details_paginated_data = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the current page on first request to be equal to the page variable 
      this.page = this.profile_data.user.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.loaded = true;
      for (let index = 0; index < this.user_details_paginated_data.length; index++) {
        this.user_details.push (this.user_details_paginated_data[index]);
      }
      this.page++; 
      event.target.complete();
      },
      error =>{
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
      }
      
      
      )
 
    
  });
  
  }
  
  doRefresh(event)
  {
    let pagination = 4;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-admins/"+pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the current page on first request to be equal to the page variable 
      this.page = this.profile_data.user.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.page++; 
      this.loaded = true;
      event.target.complete();
      },
      error =>{
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
      }
      
      )
 
         
  });
    
  }

   







}
