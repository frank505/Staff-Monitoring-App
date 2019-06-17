import { Component, OnInit } from '@angular/core';
import { LoadingController,Platform } from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthenticationServiceService} from 'src/app/services/authentication-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public form = {
    email:null,
  }

  data_response = {
    success:null,
    error:null
  };

  constructor(private router:Router,
    private authService:AuthenticationServiceService,
    private loadingController:LoadingController,
    private toast:ToastService,
    private alert:AlertService) { }

  ngOnInit() {
  }

  async RequestReset()
  {
    const loading = await this.loadingController.create({ message: 'loading..',spinner:'crescent' })
    loading.present().then( () => {
          this.authService.ForgotPassword(this.form).subscribe(
        data => {
          console.log(data);
          this.data_response.success = data;
           if(this.data_response.success.success == true )
           {
             this.toast.presentToastWithOptions("a link has been sent to your mail note that this expires within 24 hours");
           loading.dismiss();
            }
        },
        
        error => {
          console.log(error)
          this.data_response.error = error;
          this.toast.presentToastWithOptions("there seems to be a problem please try again later");
          loading.dismiss();
      })
    });

  }


}
