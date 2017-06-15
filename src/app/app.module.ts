import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule, JsonpModule } from '@angular/http';

import { RegisterPage } from '../pages/register/register';
import { Newsmeal } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/newspage/newspage';
import { LoginPage } from '../pages/sign-in/sign-in';
import { Navigate } from '../pages/home/navigate/navigate';


@NgModule({
  declarations: [
    Newsmeal,
    HomePage, 
    NewsPage,
    LoginPage,
    RegisterPage,
    Navigate
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Newsmeal),
    IonicStorageModule.forRoot(),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Newsmeal,
    HomePage,
    NewsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
