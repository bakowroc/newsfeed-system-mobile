import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/newspage/newspage';
import { LoginPage } from '../pages/sign-in/sign-in';

@Component({
  templateUrl: 'app.html'
})
export class Newsmeal {
  rootPage:any = HomePage;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen
  ) {

        platform.ready().then(() => {

        });

    }
}
