import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-message-creator-app-modal',
  templateUrl: './message-creator-app-modal.page.html',
  styleUrls: ['./message-creator-app-modal.page.scss'],
})
export class MessageCreatorAppModalPage implements OnInit {

  public form = {
    name:null,
    email:null,
    message:null
  }
  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  Login()
  {
    console.log(this.form)
  }

}
