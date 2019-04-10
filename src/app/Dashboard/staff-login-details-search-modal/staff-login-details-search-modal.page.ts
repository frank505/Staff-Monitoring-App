import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,LoadingController} from '@ionic/angular';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';
import {HttpService} from '../../services/http.service';
import {  AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login-details-search-modal',
  templateUrl: './staff-login-details-search-modal.page.html',
  styleUrls: ['./staff-login-details-search-modal.page.scss'],
})
export class StaffLoginDetailsSearchModalPage implements OnInit {

  modalTitle:string;
  searchContent:any;
  loaded:boolean = false;
  public response = {
    success:null,
    error:null
  }
  public resSalaryDeduction = {
    success:null,
    error:null,
    date:null,
  }
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private http:HttpService,
    private authService:AuthenticationServiceService,
    private loadingController:LoadingController,
    private toast:ToastService,
    private storage:Storage,private alert:AlertService,
   private alertctrl:AlertController,
   private router:Router
 ) { }

 ngOnInit() {
   this.modalTitle = this.navParams.data.Header; 
 }

 async closeModal() {
   const onClosedData: string = "Wrapped Up!";
   await this.modalController.dismiss(onClosedData);
 }

async performSearch()
{
 console.log(this.searchContent);
 if(this.searchContent==null)
 {
   this.alert.presentAlert("required field","date field required","date field is required");
 }else{
   let tokenPlaceholder = this.authService.returnTokenPlaceholder();
   this.loaded = false;
     this.storage.get(tokenPlaceholder).then(async token=>{
       const loading = await this.loadingController.create({ message: 'login details loading..',spinner:'bubbles' })
       loading.present().then(()=>{
         this.http.getData("/admin/get-search-daily-login-details/"+this.searchContent,token).subscribe(subscribed_data=>{
         console.log(subscribed_data);
         this.response.success = subscribed_data;
         this.loaded = true;
         loading.dismiss();
         },
         error =>{
           loading.dismiss();
           console.log(error);
           this.response.error = error;
         this.alert.presentAlert("error","login error",this.response.error.error.message);
   
         }
         
         )
    
       })
        
     });
 
 }

}

async goToTaskStaffLoginDetails(id,date,day,month,year)
{
 this.closeModal();
 this.router.navigate(["/admin/dashboard/staff-full-login-details",{id:id,date:date,month:month,year:year,day:day}]);

} 

async deductSalaryForLateComing(id,date,day,month,year,name)
{
 const alert = await this.alertctrl.create({
   header: 'Staff Login Details',
   message: 'would you like to deduct staff salary? if yes the click the yes option.if you have deducted staff salary and want to delete it then use the delete option',
   buttons: [
     {
       text: 'Cancel',
       role: 'cancel',
       cssClass: 'secondary',
       handler: (blah) => {
         console.log('Confirm Cancel: blah');
       }
     }, {
       text: 'Yes',
       handler: () => {
       this.deductSalaryModal(id,date,day,month,year,name);        
       }
     },
     {
       text:'delete',
       handler: ()=>{

       }
     },
   ]
 });

 await alert.present();

}

async deductSalaryModal(id,date,day,month,year,name)
{
 //correct date time was given a variable and passed as it will help speeden things up on the server side
 this.resSalaryDeduction.date = this.searchContent;
let user_data = {
 id:id,
 date:date,
 day:day,
 month:month,
 year:year,
 correct_date_time:this.resSalaryDeduction.date,
 name:name
}

const alert = await this.alertctrl.create({
 header: 'Staff Login Details',
 message: 'would you like to do a custom salary deduction with complaints or default salary deduction?',
 buttons: [
   {
     text: 'Cancel',
     role: 'cancel',
     cssClass: 'secondary',
     handler: (blah) => {
       console.log('Confirm Cancel: blah');
     }
   }, {
     text: 'custom',
     handler: () => {
       this.presentCustomDeductionForm(user_data)    
     }
   },
   {
     text:'default',
     handler: ()=>{
    this.deductSalaryByDefault(user_data)
     }
   },
 ]
});

await alert.present();

}

async deductSalaryByDefault(user_data)
{
 // return console.log(user_data)
 let tokenPlaceholder = this.authService.returnTokenPlaceholder();
 this.storage.get(tokenPlaceholder).then(async token=>{
   const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
   loading.present().then(()=>{
this.http.postData(user_data,"/admin/deduct-salary-by-default",token).subscribe((data)=>{
  console.log(data)
  this.loaded = true;
  this.resSalaryDeduction.success = data;
 if(this.resSalaryDeduction.success.hasOwnProperty("data_exist")){
   this.updateSalaryByDefaultModal(user_data);  
   loading.dismiss();
  }else{
    this.alert.presentAlert("success","success","staff salary deducted successfully");
    loading.dismiss();
  }
  loading.dismiss();
},
   error =>{
   loading.dismiss();
   this.resSalaryDeduction.error = error;
   console.log(error);   
   this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.message);
     })
})
 });
}

 async updateSalaryByDefaultModal(user_data)
 {
  const alert = await this.alertctrl.create({
    header: 'Staff Login Details',
    message: 'salary has already been deducted before would you like to overide it by setting custom amount for deduction?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'yes',
        handler: () => {
          this.updateSalaryByDefault(user_data)    
        }
      },
    ]
   });
   
   await alert.present();
   
 }


 updateSalaryByDefault(user_data)
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
    loading.present().then(()=>{
 this.http.postData(user_data,"/admin/update-deduct-salary-by-default",token).subscribe((data)=>{
   console.log(data)
   this.loaded = true;
   this.resSalaryDeduction.success = data;
     this.alert.presentAlert("success","success",this.resSalaryDeduction.success.message);
     loading.dismiss();
  },
    error =>{
    loading.dismiss();
    this.resSalaryDeduction.error = error;
    console.log(error);   
    this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.message);
      })
 })
  });
 }


async presentCustomDeductionForm(user_data)
{
 const alert = await this.alertctrl.create({
   header: 'Staff Login Details',
    inputs: [
     {
       name: 'amount',
       type: 'number',
       id: 'name2-id',
       placeholder: 'amount to be deducted from staff salary'
     },
     {
       name: 'complaints',
       type: 'text',
       placeholder: 'complaints if any on staff(optional)'
     },
     
    
   ],
   buttons: [
     {
       text: 'Cancel',
       role: 'cancel',
       cssClass: 'secondary',
       handler: () => {
         console.log('Confirm Cancel');
       }
     }, {
       text: 'Ok',
       handler: (data) => {
         console.log(JSON.stringify(data));
         console.log(data.complaints)
      this.CustomDeductionOfSalary(user_data,data);
       }
     }
   ]
 });

 await alert.present();
}


CustomDeductionOfSalary(user_data,dataFromInput)
{
  let data = {
    id:user_data.id,
    date:user_data.date,
    day:user_data.day,
    month:user_data.month,
    year:user_data.year,
    name:user_data.name,
    correct_date_time:user_data.correct_date_time,
    amount:dataFromInput.amount,
    complaints:dataFromInput.complaints
  }
  
  if(dataFromInput.amount==null){
    this.alert.presentAlert("required","required Field","please enter an amount to be deducted")
  }else if(dataFromInput.complaints==""){
    this.alert.presentAlert("required","required Field","complaints field cannot be left empty")
  }

  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
 this.storage.get(tokenPlaceholder).then(async token=>{
   const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
   loading.present().then(()=>{
this.http.postData(data,"/admin/deduct-salary-by-custom",token).subscribe((response)=>{
  console.log(response)
  this.loaded = true;
  this.resSalaryDeduction.success = response;
  if(this.resSalaryDeduction.success.hasOwnProperty("data_exist"))
  {
    loading.dismiss();
    return this.updateSalaryCustomModal(data);
   
  }
    this.alert.presentAlert("success","success",this.resSalaryDeduction.success.message);
    loading.dismiss();

},
   error =>{
   loading.dismiss();
   this.resSalaryDeduction.error = error;
   console.log(error);   
   this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.message);
     })
})
 });

}


async updateSalaryCustomModal(data)
{

  const alert = await this.alertctrl.create({
    header: 'Staff Login Details',
    message: 'salary has already been deducted before would you like to overide it with your custom amount for deduction?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'yes',
        handler: () => {
          this.updateSalaryCustom(data)    
        }
      },
    ]
   });
   
   await alert.present();
  
}


updateSalaryCustom(data)
{
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
 this.storage.get(tokenPlaceholder).then(async token=>{
   const loading = await this.loadingController.create({ message: 'loading..',spinner:'bubbles' })
   loading.present().then(()=>{
this.http.postData(data,"/admin/update-deduct-salary-by-custom",token).subscribe((response)=>{
  console.log(response)
  this.loaded = true;
  this.resSalaryDeduction.success = response;
    this.alert.presentAlert("success","success",this.resSalaryDeduction.success.message);
    loading.dismiss();
},
   error =>{
   loading.dismiss();
   this.resSalaryDeduction.error = error;
   console.log(error);   
   this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.message);
     })
})
 });

}



}

