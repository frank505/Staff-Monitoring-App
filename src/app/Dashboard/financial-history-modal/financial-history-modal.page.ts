import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController, NavParams,LoadingController, IonInfiniteScroll} from '@ionic/angular';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-financial-history-modal',
  templateUrl: './financial-history-modal.page.html',
  styleUrls: ['./financial-history-modal.page.scss'],
})
export class FinancialHistoryModalPage implements OnInit {
  Object = Object;
  Header:string;
  userId:any;
  UserAvailableYear:any;
public ModalSearchData = {
  month:null,
  year:null,
}

public response = {
  success:null,
  error:null,
  isLoaded:false,
  data_storage:null,
  username:null
}
  customPopoverFinancialMonthOptions: any = {
    header: 'Select Month',
    subHeader: 'Select the month for user financial history',
    message: 'the month selected above will give you full details of staffs financial details for that year',
    translucent: true
  };
  customPopOverFinancialYearOptions:any = {
    header: 'Select Year',
    subHeader: 'Select the year for user financial history',
    message: 'the year selected above will give you full details of staffs financial details for that year',
    translucent: true
  }
  
  //no pagination here for version 1.0 until version 1.1 
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //  public pagination = {
  //    per_page:8,
  //    page:1
  //  }

  constructor(private modalController:ModalController,
    private navParams:NavParams,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpService,
    private authService:AuthenticationServiceService,
    private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService) 
     {
       this.getYearAvailableForUser();
      }

  ngOnInit() {
    this.Header = this.navParams.data.Header;
   this.userId = this.navParams.data.userId;
  }

  
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

 async goToTaskDetails(id)
  {
   this.closeModal();
   await this.router.navigate(["admin/dashboard/tasks/tasks/full-task-details",{id:id}]);
 
  }

  ///get-year/{id}
 getYearAvailableForUser()
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ spinner:'bubbles' })
    loading.present().then(()=>{
      this.http.getData("/admin/get-year/"+this.userId,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.UserAvailableYear  = subscribed_data;
       this.UserAvailableYear.forEach((element,index) => {
         this.response.username = element.name;
       });
       console.log(this.response.username)
      loading.dismiss();
      },
      error =>{
        loading.dismiss();
        console.log(error);
        this.response.error = error;
       this.alert.presentAlert("error","profile error",this.response.error.message);

      }
      
      
      )
 
    })
     
  });

 }

 
//post is used here because the number of parameters to be passed will be too much
 SearchForUser()
 {
   if(this.ModalSearchData.month==null){
    this.alert.presentAlert("required","required field","please select a month") 
   }else if(this.ModalSearchData.year==null){
     this.alert.presentAlert("required","required field","please select a year if no year exists then user has never been punished for any crime before")
   }
   this.response.isLoaded = false;
   let data = {
     month:this.ModalSearchData.month,
     year:this.ModalSearchData.year,
     id:this.userId
   }
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ spinner:'bubbles', message:'..searching for financial report' })
    loading.present().then(()=>{
      this.http.postData(data,"/admin/full-financial-report",token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.response.success = subscribed_data;
      this.response.isLoaded = true;
      loading.dismiss();
      },
      error =>{
        loading.dismiss();
        console.log(error);
        this.response.error = error;
       this.alert.presentAlert("error","profile error",this.response.error.message);

      }
      
      
      )
 
    })
     
  });
  
 }


//  LoadMoreSearchedContent(event)
//  {
//   let data = {
//     month:this.ModalSearchData.month,
//     year:this.ModalSearchData.year,
//     id:this.userId
//   }
//    //the number of contents we want per page is what i called pagination
//    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
//  this.storage.get(tokenPlaceholder).then(async token=>{
//      this.http.postData(data,"/admin/full-financial-report"+"/"+this.pagination.per_page+"?page="+this.pagination.page,token).subscribe(subscribed_data=>{
//      console.log(subscribed_data)
    
//      this.pagination.page++; 
//      event.target.complete();
//      },
//      error =>{
//        console.log(error);
//       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
//      }
     

//      )

   
//  });
 
//  }

}
