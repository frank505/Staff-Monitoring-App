import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from "@ionic/storage";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule,FormBuilder,FormGroup } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService  } from '../app/services/http.service';
import { AuthGaurdService as Auth } from '../app/services/auth-gaurd.service';
import { LoadingService } from './services/loading.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { FileUploadModule } from 'ng2-file-upload';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {FinancialModalPageModule} from '../app/Dashboard/financial-modal/financial-modal.module';
import {FinancialHistoryModalPageModule} from '../app/Dashboard/financial-history-modal/financial-history-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,HttpClientModule, IonicStorageModule.forRoot(),
  IonicSelectableModule,FileUploadModule,FinancialModalPageModule,
  FinancialHistoryModalPageModule
],
  providers: [
    HttpService,
    Auth,
    StatusBar,
    FileTransfer,
    File,
    FileTransferObject,
    FormBuilder,
    SplashScreen,LoadingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
