import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map'
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../../sign-in/sign-in';
import { HomePage } from '../home';
import { RegisterPage } from '../../register/register';

@Component({
  selector: 'navigate',
  templateUrl: 'navigate.html'
})

export class Navigate implements OnInit{

    @Input()
        current_user: Object

    constructor(private navCtrl: NavController, private storage: Storage){}

    ngOnInit(){}

    navigateTo(path: string){
        switch(path){

            case 'login':
                this.navCtrl.push(LoginPage)
                break;

            case 'register':
                this.navCtrl.push(RegisterPage)
                break;

            case 'home':
                this.navCtrl.push(HomePage)
                break;

        }
    }

    logout(){

        this.storage.remove('jwttoken')
        this.navCtrl.push(HomePage)

    }

}
