import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {LoadingController,AlertController} from '@ionic/angular';
import {AlertService} from 'src/app/services/alert.service';
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';
import {HttpService} from 'src/app/services/http.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-staff-full-login-details',
  templateUrl: './staff-full-login-details.page.html',
  styleUrls: ['./staff-full-login-details.page.scss'],
})
export class StaffFullLoginDetailsPage implements OnInit {

  paramaters:any;
  LoginDetails:any;
  loaded:boolean = false;
  error_message:any;
  staff_id:any;
  public resSalaryDeduction = {
   success:null,
   error:null,
  }
  public deletePunishement = {
    success:null,
    error:null
  }
  constructor(private router:Router,private route:ActivatedRoute,
    private loadingController:LoadingController,private alert:AlertService,
    private Toast:ToastService,private authService:AuthenticationServiceService,
    private http:HttpService,private storage:Storage,private alertController:AlertController) { 
    this.getParams();
    this.showFullDetails();
  }

  ngOnInit() 
  {

  }

  getParams()
  {
    this.route.params.subscribe((params)=>{
      this.paramaters = params;
      console.log(this.paramaters)
    })
  }

  showFullDetails()
  {
    this.loaded = false;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'login details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
   this.http.postData(this.paramaters,"/admin/show-full-login-details",token).subscribe((data)=>{
     console.log(data)
     this.loaded = true;
     this.LoginDetails = data;
     loading.dismiss();
   },
      error =>{
      loading.dismiss();
      console.log(error);   
      this.alert.presentAlert("error","error",this.error_message.error.error);
        })
  })
    });
}

async PunishStaff(id)
{
  this.presentAlertConfirm(id);
}



async presentAlertConfirm(id)
{
  this.staff_id = id;
  const alert = await this.alertController.create({
    header: 'Staff Login Details',
    message: 'Would you like to deduct this staff salary that pertains to attendance issues or delete any salary deduction?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      },
      {
        text: 'delete',
        handler: () => {
         console.log(this.staff_id)
         this.deleteStaffFinancialPunishement(this.staff_id);
        }
      }, 
      {
        text: 'Yes',
        handler: () => {
         console.log(this.staff_id)
         this.presentAlertPrompt(this.staff_id);
        }
      }
    ]
  });

  await alert.present();
}

deleteStaffFinancialPunishement(id)
{
  
  let user_data = {
    date:this.paramaters.date,
    day:this.paramaters.day,
    month:this.paramaters.month,
    year:this.paramaters.year,
    id:id,
    name:this.LoginDetails.data[0].staff_name
  }
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'task details loading..',spinner:'bubbles' })
    loading.present().then(()=>{
 this.http.postData(user_data,"/admin/delete-deducted-money-for-attendance",token).subscribe((data)=>{
   console.log(data)
   this.loaded = true;
   this.deletePunishement.success = data;
     this.alert.presentAlert("success","success",this.deletePunishement.success.message);
    loading.dismiss();
 },
    error =>{
    loading.dismiss();
    this.deletePunishement.error = error;
    console.log(error);   
    this.alert.presentAlert("error","error",this.deletePunishement.error.error.message);
      })
})
  });
}


async presentAlertPrompt(id) {
  const alert = await this.alertController.create({
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
          this.submitDeductionForAttendance(data,this.staff_id);
        }
      }
    ]
  });

  await alert.present();
}



submitDeductionForAttendance(data,id)
{
  if(data.amount==null  || data.amount==""){
  return  this.alert.presentAlert("amount field","amount field","amount field is required")
  }else if(data.complaints==null || data.complaints=="")
  {
   return this.alert.presentAlert("complaints field","complaints field","complaints field cannot be left empty")
  }
  let user_data = {
    date:this.paramaters.date,
    day:this.paramaters.day,
    month:this.paramaters.month,
    year:this.paramaters.year,
    amount:data.amount,
    complaints:data.complaints,
    id:id,
    name:this.LoginDetails.data[0].staff_name
  }
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'task details loading..',spinner:'bubbles' })
    loading.present().then(()=>{
 this.http.postData(user_data,"/admin/deduct-money-for-attendance",token).subscribe((data)=>{
   console.log(data)
   this.loaded = true;
   this.resSalaryDeduction.success = data;
   if(this.resSalaryDeduction.success.hasOwnProperty("data_exist")){
    this.presentOptionsToUpdateContent(user_data);  
    loading.dismiss();
   }else{
     this.alert.presentAlert("success","success","staff salary deducted successfully");
     loading.dismiss();
   }
   
 },
    error =>{
    loading.dismiss();
    this.resSalaryDeduction.error = error;
    console.log(error);   
    this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.error);
      })
})
  });
}

async presentOptionsToUpdateContent(data)
{
  const alert = await this.alertController.create({
    header: 'Staff Login Details',
    message: 'staff salary already deducted for this day would you like to update salary a;ready deducted to be replaced with this new one?',
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
         console.log(this.staff_id)
         this.updateDeductedSalary(data);
        }
      }
    ]
  });

  await alert.present();
}


updateDeductedSalary(data)
{
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'task details loading..',spinner:'bubbles' })
    loading.present().then(()=>{
 this.http.postData(data,"/admin/update_deducted-money",token).subscribe((data)=>{
   console.log(data)
   this.loaded = true;
   loading.dismiss();
   this.alert.presentAlert("success","success","staff salary dedudction successfully updated");
 },
    error =>{
    loading.dismiss();
    this.resSalaryDeduction.error = error;
    console.log(error);   
    this.alert.presentAlert("error","error",this.resSalaryDeduction.error.error.error);
      })
})
  });
}

}