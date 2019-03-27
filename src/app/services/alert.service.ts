import { Injectable } from '@angular/core';
import {  AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController:AlertController) { }

  async presentAlert(header,subHeader,message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

   

  //end of this class
}
