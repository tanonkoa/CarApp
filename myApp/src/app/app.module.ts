//app version 1

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular/umd';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MemoryPage} from '../pages/memory/memory';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { DeviceMotion } from '@ionic-native/device-motion';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    MemoryPage,
    HomePage,
    TabsPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    ContactPage,
    MemoryPage,
    HomePage,
    TabsPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    DeviceMotion,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   
    ]
  

})

export class AppModule {

  
}





