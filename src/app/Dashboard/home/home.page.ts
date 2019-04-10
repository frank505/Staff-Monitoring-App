import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'; 
import { PushServiceService } from 'src/app/services/push-service.service';
import { AuthenticationServiceService } from "src/app/services/authentication-service.service";
import {MessageCreatorAppModalPage} from 'src/app/Dashboard/message-creator-app-modal/message-creator-app-modal.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private showContent:boolean = false;
 private year:any;
 private date:any;

  constructor(private router:Router,
    private push:PushServiceService,
    private authService:AuthenticationServiceService,
    private modalController:ModalController) 
  {
   // this.push.getToken();
   // this.push.refreshToken();
   this.setYear();
   }

  ngOnInit() {
 
  }

 
  setYear()
  {
    this.date = new Date();
    this.year = this.date.getFullYear();
  }

  async loadMessageModal()
  {
    const modal = await this.modalController.create({
      component: MessageCreatorAppModalPage,
      componentProps: {
        "Header": "Message App Creator",
      }
  });

modal.onDidDismiss().then((dataReturned) => {
  if (dataReturned !== null) {
    console.log('Modal Sent Data :', dataReturned);
  }
});

return await modal.present();

}


}