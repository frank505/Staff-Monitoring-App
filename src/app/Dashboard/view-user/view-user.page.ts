import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertService } from "../../services/alert.service";
import { ToastService } from '../../services/toast.service';
import { PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

 parameters:any;
  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,
     private storage:Storage,private alert:AlertService,private route:ActivatedRoute,
     private photoviewer:PhotoViewer) { }
 
     user_details:any;
     profile_data:any;
     user_image_directory:any;
     loaded:boolean = false;
  ngOnInit() {
 this.getId();
 this.loadFullProfile();
  }

  getId()
  {
    this.route.params.subscribe(
      params=> this.parameters = params
    );
    return this.parameters.id;
  }

  
  loadFullProfile()
  {
    let tokenPlaceholder = this.authService.returnTokenPlaceholder();
    this.storage.get(tokenPlaceholder).then(async token=>{
      const loading = await this.loadingController.create({ message: 'profile details loading..',spinner:'bubbles' })
      loading.present().then(()=>{
        this.http.getData("/admin/user/"+this.parameters.id,token).subscribe(subscribed_data=>{
        console.log(subscribed_data)
        this.profile_data = subscribed_data;
        this.user_details = this.profile_data.user;
        console.log(this.profile_data.status)
        this.user_image_directory = this.profile_data.file_directory;
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

 
  viewImage()
  {
    let url = this.user_image_directory+this.user_details.profilephoto;
    console.log(url)
    this.photoviewer.show(url);
  }

}
