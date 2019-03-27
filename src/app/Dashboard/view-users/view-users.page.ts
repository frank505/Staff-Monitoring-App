import { Component, OnInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // loads all the profile data of the user into this variable
  profile_data:any;
  //this loads the user object from the profile data sent from our API
  user_details:any;
  //this tells whether our loade  indicator will stop or not once view is loaded waitng for response of content from the server
   loaded:boolean = false;
  page:any;
  user_details_paginated_data: any;
  user_image_directory:any;
  search_input_value:any;
  //this will hide or show an indeterminate progress bar
  search_progress_bar_indicator:boolean = false;
  //display deleted message
 delete_data_msg:any;
 //this id is the store the id of the staff to be deleted
 delete_id:any;

  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
     private actionSheetController: ActionSheetController) {
      this.LoadStaffsCreated();
      }

  ngOnInit() {
  }

  LoadStaffsCreated()
  {
    let pagination = 8;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'bubbles' })
   // console.log(header)
    loading.present().then(()=>{
      this.http.getData("/admin/all-users/"+pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the image directory to this variable 
      this.user_image_directory = this.profile_data.file_directory;
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


  LoadMoreUserDataBasedOnCurrentSearchInputValue(event)
  {
    if(this.search_input_value=="" || this.search_input_value==null){
      this.loadMoreData(event);
    }else{
      this.LoadMoreSearchedContent(event);
    }
  }

  loadMoreData(event)
  {
    //the number of contents we want per page is what i called pagination
    let pagination = 8;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-users/"+pagination+"?page="+this.page,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details_paginated_data = this.profile_data.user.data;
      console.log(this.profile_data.status)
      this.user_image_directory = this.profile_data.file_directory;
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


  doRefresh(event) {
    let pagination = 8;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-users/"+pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the image directory to this variable 
      this.user_image_directory = this.profile_data.file_directory;
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

   
  SearchForContent(event)
  {
    //get the search input value
    this.search_progress_bar_indicator = event.target.value;
    let pagination = 8;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/search-users/"+this.search_input_value+"/"+pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details = this.profile_data.user.data;
      console.log(this.profile_data.status)
      //set the image directory to this variable 
      this.user_image_directory = this.profile_data.file_directory;
      //set the current page on first request to be equal to the page variable 
      this.page = this.profile_data.user.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.page++; 
      this.search_progress_bar_indicator = false;
      },
      error =>{
        console.log(error);
       //this.alert.presentAlert("error","profile error",error);
      }
      ) 
  });
  }

  LoadMoreSearchedContent(event)
  {
    //the number of contents we want per page is what i called pagination
    let pagination = 8;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/search-users/"+this.search_input_value+"/"+pagination+"?page="+this.page,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.profile_data = subscribed_data;
      this.user_details_paginated_data = this.profile_data.user.data;
      console.log(this.profile_data.status)
      this.user_image_directory = this.profile_data.file_directory;
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


  deleteStaffAccount(staff_id)
  {
     this.delete_id = staff_id;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    //this id must be passed since our http service requires it but it will not be used
    let id = {
      id:staff_id
    }
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'deleting staff...',spinner:'bubbles' })
   // console.log(header)
    loading.present().then(()=>{
      this.http.postData(id,"/admin/delete-user/"+staff_id,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.delete_data_msg = subscribed_data;
      //removing the staff deleted from the dom content from the dom
      console.log(this.user_details)
      this.user_details = this.user_details.filter(data=>data.id !== this.delete_id);
       this.alert.presentAlert("Delete Staff","staff deleted",this.delete_data_msg.message)
      loading.dismiss();
      },
      error =>{
        loading.dismiss();
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to delete this user");
      }
      
      
      )
 
    })
     
  });

  }


  //this is to load the action sheet controller to load user details
   
 async LoadActionSheetCtrl(id)
  {
    const actionSheet = await this.actionSheetController.create({
      header: 'User Details',
      buttons: [
        {
        text: 'Staff full profile',
        icon: 'people',
        handler: () => {
         this.router.navigate(['/admin/dashboard/user-profile/user-profile/view-user', {id:id}])
        }
      }, {
        text: 'login feedback',
        icon: 'log-in',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Monthly Salary Details',
        icon: 'cash',
        handler: () => {
         this.router.navigate(["/admin/dashboard/user-profile/user-profile/financial-report",{id:id}])
        }

      },
      {
        text: 'Delete Staff',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteStaffAccount(id);
          console.log('Delete clicked');
        }
      }, 
       {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }




 




}
