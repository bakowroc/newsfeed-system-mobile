import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'

import { HomePage } from '../home/home';
import { LoginPage } from '../sign-in/sign-in';

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {

    register = {}

    constructor(
        private http: Http,
        private navCtrl: NavController
     ) {}

    ngOnInit(){}

    registerForm() {

        if(this.register['password'] == this.register['re_password'] && this.register['password'] != null){

            let register_body_object = {
                email: this.register['email'],
                username: this.register['username'],
                password: this.register['password'],
                first_name: '',
                last_name: ''
            }

            this.preparePostRegister(register_body_object)
                    .subscribe((response)=>{

                        console.log(response);
                        if(response)
                            this.navCtrl.push(LoginPage);

                    });

        }

    }

    preparePostRegister(object: Object){

        return this.http.post('http://news-feed-system.herokuapp.com/api/users/create/', object)
                    .map((res: Response) => res.json());

    }

    navigateToLogin(){

        this.navCtrl.push(LoginPage);

    }

}
