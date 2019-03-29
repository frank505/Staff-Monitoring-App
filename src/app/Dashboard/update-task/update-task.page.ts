import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  
  @ViewChild('resetFile') resetFile: ElementRef;

  public uploader: FileUploader = new FileUploader({});
  parameters:any;
  public dataHolder = {
    task_data:null,
    options:null,
    data:null,
    parse_options:null,
    loader:false,
    approval_text:null,
  }
  response_messages = {
    success:null,
    error:null
  }

  public taskForm = {
    header:null,
    task_content:null,
    get_file:null,
  }

  constructor(private http:HttpService,
    private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,
     private route:ActivatedRoute,
     private transfer: FileTransfer, private file: File) {
       this.loadFullTask();
       this.getId();
      }

  ngOnInit() { }


  

  getId()
  {
    this.route.params.subscribe(
      params=> this.parameters = params
    );
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
        //set the ngmodel variables to the data recieved before once component loads
      this.taskForm.header = this.dataHolder.task_data.task_header;
      this.taskForm.task_content = this.dataHolder.task_data.task_content;
         this.dataHolder.loader = true;
        loading.dismiss();
        },
        error =>{
          this.dataHolder.loader = true;
          loading.dismiss();
          console.log(error);
          
         this.alert.presentAlert("error","profile error","an error occured trying to load your profile details");
  
        }
        
        
        )
   
      })
       
    });
  
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


  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  //getting files by creating a viewchild as a string
  // onChange(files) { 
  //   console.log(files);
  // }

  UpdateTask(id)
  {
    if(this.taskForm.header=="" || this.taskForm.header==null ){
      this.alert.presentAlert("Required","this is required","task header is required")
    }else if(this.taskForm.task_content=="" || this.taskForm.task_content==null ){
      this.alert.presentAlert("Required","this is required","instructions text input is required")
    }else{
    // if all is set and done check if the file path is empty and if it is then upload it like that
    // elese do the second way
    let form_data = new FormData();
   try{
   
    this.taskForm.get_file = this.getFiles();
    form_data.append("header",this.taskForm.header);
    form_data.append("task",this.taskForm.task_content);
    form_data.append("task_attached_file",this.taskForm.get_file[0].rawFile);
   }catch(ex){
     console.log(ex)
   }finally{
  let tokenPlaceholder = this.authService.returnTokenPlaceholder();
  console.log(tokenPlaceholder);
  this.storage.get(tokenPlaceholder).then( async token=>{
    const loading = await this.loadingController.create({ message: 'please wait while task is updated..',spinner:'bubbles' })
    loading.present().then(()=>{
      console
     this.http.postData(form_data,"/admin/update-task/"+id,token).subscribe(data=>{
       console.log(data)
       this.response_messages.success = data;
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


  removeFileInputContent() {
    console.log(this.resetFile.nativeElement.files);
    this.resetFile.nativeElement.value = "";
    console.log(this.resetFile.nativeElement.files);
}

}
