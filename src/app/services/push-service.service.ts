import { Injectable } from '@angular/core';
import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import {ToastService} from './toast.service';
import {HttpService} from './http.service';
import {AuthenticationServiceService} from './authentication-service.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PushServiceService {

 user_token:any;

  constructor(private fcm:FCM,private router:Router,
    private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform,
              private toast:ToastService,
              private http:HttpService,
              private authService:AuthenticationServiceService,
              private storage:Storage) { }

  
async getToken()
{
  let tokenPlaceHolder =  this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceHolder).then((token)=>{
  this.user_token = token;
  console.log(this.user_token);
  this.fcm.getToken().then(token => {
 let data =  {
   push_token:token,
   token:this.user_token
 }  //send token to the server to either insert or update
    this.http.postData(data,"/admin/save-push-token",this.user_token).subscribe((res)=>{
      console.log(res)
    })
    console.log(token);

  });
  })

 
}

async refreshToken()
{
  let tokenPlaceHolder =  this.authService.returnTokenPlaceholder();
  this.storage.get(tokenPlaceHolder).then((token)=>{
  this.user_token = token;
  console.log(this.user_token);
  this.fcm.onTokenRefresh().subscribe(token => {
    let data =  {
      push_token:token,
      token:this.user_token
    }  //send token to the server to either insert or update
       this.http.postData(data,"/admin/save-push-token",this.user_token).subscribe((res)=>{
         console.log(res)
       });
       console.log(token);
  });
 
  });
 }

subscriptionToAll()
{
  this.fcm.subscribeToTopic("all");
}


sendPushNotificationTest()
{
  // this.getToken();
  // this.refreshToken();
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
