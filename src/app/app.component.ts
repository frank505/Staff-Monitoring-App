import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { AuthenticationServiceService } from "./services/authentication-service.service";
import {PushServiceService} from './services/push-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthenticationServiceService,
    private push:PushServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     // this.push.getToken();
      //this.push.refreshToken();
      //this.push.sendPush();
     // this.push.notificationSetup();
     this.push.subscriptionToAll();
     this.push.sendPushNotificationTest();
      this.authService.checkToken();
   this.authService.authenticationState.subscribe(state=>{
     if(!state){
      this.router.navigate(["home"]);   
     }else{
      
      this.router.navigate(["/admin/dashboard/home"]);
     }
     
   })
   
    });
  }
}
