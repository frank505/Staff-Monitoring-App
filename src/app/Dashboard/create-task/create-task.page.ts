import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicSelectableComponent } from "ionic-selectable";
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import {  ActionSheetController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import {ToastService} from '../../services/toast.service';
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  @ViewChild('resetFile') resetFile: ElementRef;

  public uploader: FileUploader = new FileUploader({});

   singleStaff:any;
   staffsToSearchFrom:any;
   id:any;
   data:any;
   subscribed_data:any;
    page:any;
    user_details_paginated_data:any;
    file_path:any;
   selected_users:any = {
     data:[]
   };
   header:any;
   UserInstruction:any;
  value_array:any;
   staffs:any;
  response_messages = {
     success:null,
     error:null
   }



 //  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  
  //  let searchText = this.portComponent.searchText;
  

  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
     private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
//add staffs selected to be given a task to the selectble view
  LoadUsers(event:{component:IonicSelectableComponent;value:string})
  {

    console.log(event.value);
    this.value_array = event.value;
   for (let index = 0; index < this.value_array.length; index++) {
  //   const element = this.value_array[index];
     this.selected_users.data.push({name:this.value_array[index].name,id:this.value_array[index].id});
   }
  
    //this.selected_users = event.value;
    

  }

  searchStaffs(event:{component: IonicSelectableComponent, text: string})
  {
    let search_text = event.text;
    event.component.startSearch();
     //get the search input value
      let pagination = 10;
     let tokenPlaceholder = this.authService.returnTokenPlaceholder();
   this.storage.get(tokenPlaceholder).then(async token=>{
       this.http.getData("/admin/search-users/"+search_text+"/"+pagination,token).subscribe(subscribed_data=>{
       console.log(subscribed_data)
       this.subscribed_data = subscribed_data;
     this.data = this.subscribed_data.user.data;
     console.log(this.data)
    console.log(this.data[0].name)
    this.page = this.subscribed_data.user.current_page;
      //after that we increment the variable by one so we can use it to load infinite data
      this.page++; 
       event.component.endSearch();
    
       },
       error =>{
         console.log(error);
         event.component.endSearch();

        //this.presentAlert("error","profile error",error);
       }
       ) 
   });
    
   
   
  }


  LoadMoreStaffs(event:{component: IonicSelectableComponent, text: string})
  {
      //the number of contents we want per page is what i called pagination
      let search_text = event.text;
    let pagination = 10;
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceholder).then(async token=>{
      this.http.getData("/admin/search-users/"+search_text+"/"+pagination+"?page="+this.page,token).
      subscribe(subscribed_data=>{
      this.subscribed_data = subscribed_data;
      this.user_details_paginated_data = this.subscribed_data.user.data;
     this.page = this.subscribed_data.user.current_page;
       //after that we increment the variable by one so we can use it to load infinite data
      for (let index = 0; index < this.user_details_paginated_data.length; index++) {
        this.data.push (this.user_details_paginated_data[index]);
      }
      this.page++; 
      event.component.endSearch();
      },
      error =>{
        console.log(error);
        event.component.endSearch();
      
      }
      
      
      )
 
    
  });
  }


  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  UploadTask()
  {
 //if no file is selected then simply send this instead of the file_upload to the form_data
   // if any of this is empty then show an alert saying one of them is missing
    if(this.header=="" || this.header==null ){
      this.alert.presentAlert("Required","this is required","task header is required")
    }else if(this.UserInstruction=="" || this.UserInstruction==null ){
      this.alert.presentAlert("Required","this is required","instructions text input is required")
    }else if(this.selected_users.data.length==0){
      this.alert.presentAlert("Required","this is required","no staff has been selected");
    }else{
    // if all is set and done check if the file path is empty and if it is then upload it like that
    // elese do the second way

    
    let form_data = new FormData();
      this.staffs = JSON.stringify(this.selected_users.data)
   try{
    this.file_path = this.getFiles();

    form_data.append("header",this.header);
    form_data.append("task",this.UserInstruction);
    form_data.append("selected_users",this.staffs);
    form_data.append("task_attached_file",this.file_path[0].rawFile);
   }catch(ex){
     console.log(ex)
   }finally{
  //console.log(this.file_path[0].rawFile)
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  console.log(tokenPlaceholder);
  this.storage.get(tokenPlaceholder).then( async token=>{
    const loading = await this.loadingController.create({ message: 'please wait while task is created..',spinner:'crescent' })
    // console.log(header)
    loading.present().then(()=>{
      console
     this.http.postData(form_data,"/admin/create-task",token).subscribe(data=>{
       console.log(data)
       this.response_messages.success = data;
       this.updateNotificationsTable(this.selected_users,this.UserInstruction,this.header,this.response_messages.success.id);
        loading.dismiss();
        this.toast.presentToastWithOptions(this.response_messages.success.message);
        this.uploader.clearQueue();
        this.removeFileInputContent();
     },
     error=>{
      console.log(error)
      loading.dismiss();
this.toast.presentToastWithOptions(this.response_messages.error.error);
          }
     );
    });
  }) 
   }
           }
        
  }



  updateNotificationsTable(selected_users,task_content,task_header,task_id)
  {
    console.log(task_id)
  }

  removeFileInputContent() {
    console.log(this.resetFile.nativeElement.files);
    this.resetFile.nativeElement.value = "";
    console.log(this.resetFile.nativeElement.files);
}

}
