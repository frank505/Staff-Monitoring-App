import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,LoadingController} from '@ionic/angular';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';
import {HttpService} from '../../services/http.service';
import {  AlertController } from '@ionic/angular';

@Component({
  selector: 'app-financial-modal',
  templateUrl: './financial-modal.page.html',
  styleUrls: ['./financial-modal.page.scss'],
})
export class FinancialModalPage implements OnInit {

   modalTitle:string;
  modelId:any;
  Complaints:any;
  taskId:any;
  ComplaintsData:any;
  error_message:any;
  success_message:any;
  
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private http:HttpService,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
    private alertctrl:AlertController,
     ) { }
 
  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramTitle;
    this.Complaints = this.navParams.data.Complaints;
    this.modalTitle = this.navParams.data.paramID;
    this.taskId = this.navParams.data.taskId;
    this.error_message  = this.navParams.data.error_message;
    this.success_message = this.navParams.data.success_message;
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async SubmitData()
  {
  // console.log(this.Complaints+this.taskId);
  if(this.Complaints == null)
  {
   this.alert.presentAlert("error","complaints error","nothing has been entered as a complaint yet");
  }else
  {
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'approving this task..',spinner:'bubbles' })
      loading.present().then(()=>{
        let item = {
          complaints:this.Complaints,
          id:this.taskId,
        }
        this.http.postData(item,"/admin/lay-complaints/",token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.success_message = subscribed_data;
        if(this.success_message.hasOwnProperty("complaints_exist")){
         this.updatePreviousComplaintsContent(this.Complaints,this.taskId);
         loading.dismiss();
        }else{
          loading.dismiss();
          this.alert.presentAlert("success","complaints added successfully","your complaints have been added to this task successfully")
        }
       
       
        },
        error =>{
          this.error_message = error;
          loading.dismiss();
          console.log(error);
          
         this.alert.presentAlert("error","task approval error",this.error_message.error.message);
  
        }
        
        
        )
   
      })
       
    });
  
  }
  }



  async updatePreviousComplaintsContent(Complaints,taskId)
  {
    this.Complaints = Complaints;
    this.taskId = taskId;
    const alert = await this.alertctrl.create({
      header: 'Update Complaints',
      message: 'complaints have already been added to this task for staffs before would you like to overide aleady existing '
    +'complaints with the new complaints you just submited?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
           this.updatePreviousComplaintsContentFunction(this.Complaints,this.taskId)   
          console.log("complaints updated")     
               
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        
      ]
    });

    await alert.present();
  }

  updatePreviousComplaintsContentFunction(Complaints,taskId)
  {
    this.Complaints = Complaints;
    this.taskId = taskId;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'updating complaints..',spinner:'bubbles' })
      loading.present().then(()=>{
        let item = {
          complaints:this.Complaints,
          id:this.taskId,
        }
        this.http.postData(item,"/admin/update-complaints/",token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.success_message = subscribed_data;
  
          loading.dismiss();
          this.alert.presentAlert("success","complaints updated successfully","your complaints have been updated to this task successfully")
        },
        error =>{
          this.error_message = error;
          loading.dismiss();
          console.log(error);
          
         this.alert.presentAlert("error","complaints update error",this.error_message.error.message);
  
        }
        
        
        )
   
      })
       
    });
  }


}

