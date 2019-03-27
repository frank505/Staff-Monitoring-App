import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {

 pagination = 10;
 dataHolder = {
   task_data:null,
   task_details:null,
   task_image_directory:null,
   page:null, //this is the page where the file is in the pagination
   paginated_data:null,
 }

 deleteTaskObject = {
   id:null,
   response:null
 }
 search_progress_bar_indicator:any;
 loaded:boolean = false;
 protected search_input_value:any;
  constructor(
    private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
     private actionSheetController: ActionSheetController,
     private alertctrl:AlertController
  ) { 
    this.loadTasks();
  }

  ngOnInit() {
  }

 loadTasks()
 {
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'task details loading..',spinner:'bubbles' })
    loading.present().then(()=>{
      this.http.getData("/admin/all-tasks/"+this.pagination,token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.dataHolder.task_data = subscribed_data;
      this.dataHolder.task_details = this.dataHolder.task_data.task.data;
      this.dataHolder.task_image_directory = this.dataHolder.task_data.file_directory; 
      this.dataHolder.page = this.dataHolder.task_data.task.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.dataHolder.page++; 
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


  LoadMoreData(event)
  { 
    //the number of contents we want per page is what i called pagination
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-tasks/"+this.pagination+"?page="+this.dataHolder.page,token).subscribe(subscribed_data=>{
      this.dataHolder.task_data = subscribed_data;
      this.dataHolder.paginated_data = this.dataHolder.task_data.task.data;
      this.dataHolder.task_image_directory = this.dataHolder.task_data.file_directory;
      //set the current page on first request to be equal to the page variable 
      this.dataHolder.page = this.dataHolder.task_data.task.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.loaded = true;
      for (let index = 0; index < this.dataHolder.paginated_data.length; index++) {
        this.dataHolder.task_details.push (this.dataHolder.paginated_data[index]);
      }
      this.dataHolder.page++; 
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
      let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
        this.http.getData("/admin/search-task/"+this.search_input_value+"/"+this.pagination,token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.dataHolder.task_data = subscribed_data;
        this.dataHolder.task_details = this.dataHolder.task_data.task.data;
        this.dataHolder.task_image_directory = this.dataHolder.task_data.file_directory; 
        this.dataHolder.page = this.dataHolder.task_data.task.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
        this.dataHolder.page++;
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
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/search-task/"+this.search_input_value+"/"+this.pagination+"?page="+this.dataHolder.page,token).
      subscribe(subscribed_data=>{
      //console.log(subscribed_data)
     this.dataHolder.task_data = subscribed_data;
     this.dataHolder.paginated_data = this.dataHolder.task_data.task.data;
     this.dataHolder.task_image_directory = this.dataHolder.task_data.file_directory;
     //set the current page on first request to be equal to the page variable 
     this.dataHolder.page = this.dataHolder.task_data.task.current_page;
     //after that we increment the variable by one so we can use it to load infinite data
     this.loaded = true;
     for (let index = 0; index < this.dataHolder.paginated_data.length; index++) {
       this.dataHolder.task_details.push (this.dataHolder.paginated_data[index]);
     }
     this.dataHolder.page++; 
      event.target.complete();
      },
      error =>{
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
      }
      

      )
 
    
  });
  
  }


  LoadMoreUserDataBasedOnCurrentSearchInputValue(event)
  {
    if(this.search_input_value=="" || this.search_input_value==null){
      this.LoadMoreData(event);
    }else{
      this.LoadMoreSearchedContent(event);
    }
  }

  doRefresh(event)
  {


    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/all-tasks/"+this.pagination,token).
      subscribe(subscribed_data=>{
        this.dataHolder.task_data = subscribed_data;
        this.dataHolder.task_details = this.dataHolder.task_data.task.data;
        this.dataHolder.task_image_directory = this.dataHolder.task_data.file_directory; 
        this.dataHolder.page = this.dataHolder.task_data.task.current_page;
        //after that we increment the variable by one so we can use it to load infinite data
        this.dataHolder.page = 2; 
        this.loaded = true;
      event.target.complete();
      },
      error =>{
        console.log(error);
        event.target.complete();
       this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
      }
      

      )
 
    
  });
  }


  async LoadActionSheetCtrl(id)
  {
    const actionSheet = await this.actionSheetController.create({
      header: 'Task Actions',
      buttons: [
        {
        text: 'Full Task Details',
        icon: 'people',
        handler: () => {
         this.router.navigate(['admin/dashboard/tasks/tasks/full-task-details', {id:id}]);
        }
      }, {
        text: 'update task',
        icon: 'log-in',
        handler: () => {
          this.router.navigate(['admin/dashboard/tasks/tasks/update-task', {id:id}]);
        }
      }, 
      {
        text: 'Delete Task',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.showDeleteModal(id);
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
  

  async showDeleteModal(id)
  {
    const alert = await this.alertctrl.create({
      header: 'Delete Task',
      message: 'are you sure you want to delete this task?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
           
            this.deleteTask(id);   
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
  deleteTask(task_id)
  {
    this.deleteTaskObject.id = task_id;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    //this id must be passed since our http service requires it but it will not be used
    let id = {
      id:this.deleteTaskObject.id,
    }
  this.storage.get(tokenPlaceholder).then(async token=>{
    const loading = await this.loadingController.create({ message: 'deleting task...',spinner:'bubbles' })
   // console.log(header)
    loading.present().then(()=>{
      this.http.postData(id,"/admin/delete-task",token).subscribe(subscribed_data=>{
      console.log(subscribed_data)
      this.dataHolder.task_details= this.dataHolder.task_details.filter(data=>data.id !== this.deleteTaskObject.id);
      loading.dismiss();
      this.toast.presentToastWithOptions("content successfully deleted")
      },
      error =>{
        loading.dismiss();
        console.log(error);
       this.alert.presentAlert("error","profile error","an error occured trying to delete this task");
      }
      
      
      )
 
    })
     
  });

  }

}
