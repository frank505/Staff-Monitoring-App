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
import { FCM} from '@ionic-native/fcm/ngx';
//import { Firebase } from '@ionic-native/firebase/ngx';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import {StaffLoginDetailsSearchModalPageModule} from 'src/app/Dashboard/staff-login-details-search-modal/staff-login-details-search-modal.module';
import {MessageCreatorAppModalPageModule} from 'src/app/Dashboard/message-creator-app-modal/message-creator-app-modal.module';
import { PhotoViewer} from '@ionic-native/photo-viewer/ngx'; // Initialize Firebase
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

 const config = {
  apiKey: "AIzaSyC3PDcNqD1bAFSsHdF8-JLSAxxX-HVH0h8",
  authDomain: "staff-cleversoft.firebaseapp.com",
  databaseURL: "https://staff-cleversoft.firebaseio.com",
  projectId: "staff-cleversoft",
  storageBucket: "staff-cleversoft.appspot.com",
  messagingSenderId: "912265914417"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
    FormsModule,
    HttpClientModule,
     IonicStorageModule.forRoot(),
  IonicSelectableModule,
  FileUploadModule,
  FinancialModalPageModule,
  FinancialHistoryModalPageModule,
  // AngularFireModule.initializeApp(config), 
  // AngularFirestoreModule,
  StaffLoginDetailsSearchModalPageModule,
  MessageCreatorAppModalPageModule
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
    FCM,
    PhotoViewer,
    InAppBrowser,
    NativePageTransitions,
   // Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
