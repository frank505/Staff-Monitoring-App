import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "bubbles",
       duration: 5000,
      message: 'loading...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingWithOptions(elem_pos?:any) {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: elem_pos,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}