import { Injectable } from '@angular/core';
import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import {ToastService} from './toast.service';
import {HttpService} from './http.service';
import {AuthenticationServiceService} from './authentication-service.service';
@Injectable({
  providedIn: 'root'
})
export class PushServiceService {



  constructor(private fcm:FCM,private router:Router,
    private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform,
              private toast:ToastService,
              private http:HttpService,
              private authService:AuthenticationServiceService) { }

  
async getToken()
{
  this.fcm.getToken().then(token => {
 let user_token =  this.authService.returnTokenPlaceholder();
 let data =  {
   push_token:token,
 }  //send token to the server to either insert or update
    this.http.postData(data,"/admin/save-push-token",user_token).subscribe((res)=>{
      console.log(res)
    })
    console.log(token);

  });
}

async refreshToken()
{
  this.fcm.onTokenRefresh().subscribe(token => {
    let user_token =  this.authService.returnTokenPlaceholder();
    let data =  {
      push_token:token,
    }  //send token to the server to either insert or update
       this.http.postData(data,"/admin/save-push-token",user_token).subscribe((res)=>{
         console.log(res)
       })
       console.log(token);
  });
}

sendPushNotificationTest()
{
  this.getToken();
  this.refreshToken();
  this.fcm.onNotification().subscribe(data => {
    console.log(data);
    if (data.wasTapped) {
      console.log('Received in background');
     this.router.navigate(["/admin/dashboard/staff-login-details/"+data.id]);
    } else {
      console.log('Received in foreground');
     this.toast.presentToastWithOptions(data.staff_name+" just logged in now go to login details to see more details");
    //this.router.navigate(["/admin/dashboard/staff-login-details/"+data.id]);
    }
  });
}





}
