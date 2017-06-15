import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.html'
})
export class LoginPage implements OnInit {

    login = {}

    constructor(
        private http: Http,
        private storage: Storage,
        private navCtrl: NavController
     ) {}

    ngOnInit(){}

    logForm() {

        this.getTokenOnLogin(this.login)
            .subscribe((response)=>{

                console.log(response);
                if(response){
                    this.storage.set('jwttoken', response['token']);
                    this.navCtrl.push(HomePage);
                }

            });

    }

    getTokenOnLogin(obj: Object){

        return this.http
          .post('http://news-feed-system.herokuapp.com/api/users/login/', obj)
          .map((res: Response) => res.json());

    }

    navigateToRegister(){

        this.navCtrl.push(RegisterPage);

    }
}
