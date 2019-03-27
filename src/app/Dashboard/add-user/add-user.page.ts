import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import {HttpService} from '../../services/http.service';
import { AuthenticationServiceService } from "../../services/authentication-service.service";
import { LoadingController } from '@ionic/angular';
// import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  public form:any = {
    name:null,
    email:null,
    password:null,
    confirm:null,
    number:null,
    salary:null
  }
  data_response:any;
error_response:any;
  constructor(private http:HttpService,private router:Router,
    private authService:AuthenticationServiceService,
     private loadingController:LoadingController,
     private toast:ToastService,private storage:Storage) { }

  ngOnInit() {
  }

  CreateUser()
  {
    if(this.form.password!= this.form.confirm){
      this.toast.presentToastWithOptions("password and confirm password do not match");
     }else{
       let tokenPlaceholder = this.authService.returnTokenPlaceholder();
       this.storage.get(tokenPlaceholder).then(async (token)=>{
           console.log(token)
          // let responder = token.substring(7);
     const loading = await this.loadingController.create({ message: 'registering new staff..',spinner:'bubbles' })
          loading.present().then( () => {
            this.http.postData(this.form,"/admin/register-staff",token).subscribe(
              data => {
                
                console.log(data);
                this.data_response = data;
                if(this.data_response.success==true){
                  this.toast.presentToastWithOptions("new staff added successfully")
                }else{
                  this.toast.presentToastWithOptions(this.data_response.message);
                }
                     loading.dismiss();
              },
              error => {
                
                console.log(error)
                this.error_response = error;
                if(this.error_response.error.error=="you are not an authorized user"){
                 this.toast.presentToastWithOptions(this.error_response.error.error);
                 loading.dismiss();
                 this.authService.logout().then((res)=>{
                   console.log(res)
                   this.router.navigate(["home"]);
                   loading.dismiss();
                  })  
                } else if(this.error_response.error.hasOwnProperty("message_email_taken")){
                 loading.dismiss();
                 this.toast.presentToastWithOptions(this.error_response.error.message_email_taken);
                }
                else if(this.error_response.error.success==false){
                  loading.dismiss();
       this.toast.presentToastWithOptions("invalid email format is entered or a password less than 6 characters ");
                }
              
              
              })
         })
      
      
       }) 
       
      // this.storage.get(this.authService.)
     //    
     }
  }



}
