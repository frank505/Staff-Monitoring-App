import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController, ModalController,NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {  AlertController } from '@ionic/angular';
import { FinancialModalPage } from '../financial-modal/financial-modal.page';



@Component({
  selector: 'app-full-task-details',
  templateUrl: './full-task-details.page.html',
  styleUrls: ['./full-task-details.page.scss'],
})
export class FullTaskDetailsPage implements OnInit {
  
  parameters:any;
   public dataHolder = {
     task_data:null,
     options:null,
     data:null,
     parse_options:null,
     loader:false,
     approval_text:null,
     error:null
   }

   public dissaprove = {
     response:null,
     error:null,
     complaintsId:null,
   }
   public dissaprovalOrApproval = {
      id:null,
   }
  constructor(private http:HttpService,
    private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
     private route:ActivatedRoute,
     private transfer: FileTransfer, private file: File,
     private alertctrl:AlertController, public modalController: ModalController,
     public navCtrl:NavController) { 
       
      
     }

  ngOnInit() {
    this.getId();
    this.loadFullTask();    
  }
  
ngAfterViewInit()
{

}

  getId()
  {
    this.route.params.subscribe(
      params=> this.parameters = params
    );
    console.log(this.parameters.id)
    return this.parameters.id;
  }

 async loadFullTask()
  {
    this.dataHolder.loader = false;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'task details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
        this.http.getData("/admin/single-task/"+this.parameters.id,token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
         this.dataHolder.data = subscribed_data;
         this.dataHolder.task_data = this.dataHolder.data.task;
         this.dataHolder.options = this.dataHolder.task_data.users_assigned;
         this.dataHolder.approval_text = this.dataHolder.task_data.approval_status;
         console.log(this.dataHolder.options)
         this.dataHolder.loader = true;
        loading.dismiss();
        this.getOptions();
        
        },
        error =>{
          this.dataHolder.error = error;
          loading.dismiss();
          console.log(error);
          
         this.alert.presentAlert("error","profile error",this.dataHolder.error.error.message);
        
        }
        
        
        )
   
      })
       
    });
  
  }



 async getOptions()
  {
  this.dataHolder.parse_options =  await JSON.parse(this.dataHolder.options);
   console.log(this.dataHolder.parse_options)
  } 


  DownloadAvailableFile(attached_file)
  {
    console.log(attached_file)
    const url = this.dataHolder.data.file_directory+attached_file;
    console.log(url)
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.externalDataDirectory + attached_file).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.toast.presentToastWithOptions("file has successfully finished downloading");
    }, (error) => {
      console.log("error");
      this.alert.presentAlert("error","error while downloading","an error occured while downloading this file ensure proper network connections")

      // handle error
    });
  }

  //alert message
  async ShowConfirmAlert(id) {
    this.dissaprovalOrApproval.id = id;
    console.log(id)
    const alert = await this.alertctrl.create({
      header: 'Approve or disapprove',
      message: 'once a task is dissaproved staffs salary is also deducted automatically..this can be undone also by'+
      ' approving the task...note that task by default are all approved. '
     +'the calculation for salary deduction based on task dissaproval can be seen in the help section',
      buttons: [
        {
          text: 'dissaprove',
          handler: () => {
           
            this.DissaproveTask(this.dissaprovalOrApproval.id);   
          }
        },
        {
          text: 'approve',
          handler: () => {
           this.ApproveTask(this.dissaprovalOrApproval.id);   
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

  ApproveTask(id)
  {
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'approving this task..',spinner:'bubbles' })
      loading.present().then(()=>{
        let item = {
          id :id,
        }
        this.http.postData(item,"/admin/approve-task/",token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.dissaprove.response = subscribed_data;
        // if(this.dissaprove.response.hasOwnProperty("staff_punishement_type")){
        //   this.ShowModalToAddBossComplaints(id);
        // }
        this.toast.presentToastWithOptions("task successfully approved");
        loading.dismiss();
        },
        error =>{
          this.dissaprove.error = error;
          loading.dismiss();
          console.log(error);
          
         this.alert.presentAlert("error","task approval error",this.dissaprove.error.error.message);
  
        }
        
        
        )
   
      })
       
    });
  
  }

  async ShowModalToAddBossComplaints(taskId)
  {
    this.dissaprove.complaintsId = taskId;
    const alert = await this.alertctrl.create({
      header: 'Further Complaints',
      message: 'would you like to add any complaints or reason as to why thier task was dissaproved as a result salary deducted?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
           this.AddComplaintsAfterDissaproval(this.dissaprove.complaintsId);  
          }
        },
        {
          text: 'No',
          handler: () => {
           this.refuseAddComplaintsAfterDissaproval();
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

 async AddComplaintsAfterDissaproval(taskId)
  {
    this.dissaprovalOrApproval.id = taskId;
    const modal = await this.modalController.create({
      component: FinancialModalPage,
      componentProps: {
        "paramID": "Make Your Complaints",
        "paramTitle": "Test Title",
        "taskId" : this.dissaprovalOrApproval.id,
        "Complaints":null,
        "error_message":null,
        "success_message":null,
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Modal Sent Data :', dataReturned);
        this.toast.presentToastWithOptions("task dissaproved successfully");
      }
    });
 
    return await modal.present();
     
  }

  refuseAddComplaintsAfterDissaproval()
  {
    this.toast.presentToastWithOptions("task dissaproved successfully");
  }
  


 DissaproveTask(id)
 {
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'disaproving this task..',spinner:'bubbles' })
    loading.present().then(()=>{
      let item = {
        id :id,
      }
      this.http.postData(item,"/admin/dissaprove-task/",token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.dissaprove.response = subscribed_data;
      if(this.dissaprove.response.hasOwnProperty("staff_punishement_type")){
          this.ShowModalToAddBossComplaints(id);
        }
      loading.dismiss();
      },
      error =>{
        this.dissaprove.error = error;
        loading.dismiss();
        console.log(error);
        
       this.alert.presentAlert("error","task dissaproval error",this.dissaprove.error.error.message);

      }
      
      
      )
 
    })
     
  });

 }


 MoveBack()
 {
   this.navCtrl.pop();
 }



}

