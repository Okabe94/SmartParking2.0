import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PrincipalPage } from '../pages/principal/principal';


import { MyApp } from './app.component';

//FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from "./app.firebase";

import { AngularFireAuthModule } from "angularfire2/auth"
import { FireStorageProvider } from '../providers/fire-storage/fire-storage';
import { AlertProvider } from '../providers/alert/alert';




/*export const configFireBase={

  apiKey: "AIzaSyBXMTDV6hJn1O94ClW9L3hUPgeS15dpUDE",
  authDomain: "appandroid-2590d.firebaseapp.com",
  databaseURL: "https://appandroid-2590d.firebaseio.com",
  projectId: "appandroid-2590d",
  storageBucket: "appandroid-2590d.appspot.com",
  messagingSenderId: "88300898563"
}*/
@NgModule({
  declarations: [
    MyApp,
    PrincipalPage,
    
    
     
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,    
  ],
  providers: [
    StatusBar,
    SplashScreen,  
    AngularFireDatabaseModule,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireStorageProvider,
    AlertProvider,
    
  ]
})
export class AppModule {}
