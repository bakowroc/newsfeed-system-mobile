import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http'
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

import { NewsPage } from '../newspage/newspage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    news: any;
    current_user: Object;

    constructor(
          private http: Http,
          private navCtrl: NavController,
          private storage: Storage
    ) {}

  ngOnInit(){

    this.getNews()
        .subscribe((response)=>this.news = response);


    this.getLoggedUser()
        .subscribe((response)=>this.current_user = response);

  }

  getNews(){

      return this.http
        .get('http://news-feed-system.herokuapp.com/api/news/')
        .map((res: Response) => res.json());

  }


  getAuthHeaders() {
     return Observable.fromPromise(this.storage.get('jwttoken'));
  }

  getLoggedUser(){

      return this.getAuthHeaders().flatMap(token => {

         let headers = new Headers();
         headers.append('Authorization', 'JWT ' + token);

        return this.http.get('http://news-feed-system.herokuapp.com/api/users/current/', {headers: headers})
              .map((res: Response) => res.json());
      });

  }

  navigateToDetail(id: number){

          this.navCtrl.push(NewsPage, {
              newsId: id
          });

  }

  reverseArray(input){

      return input.reverse();

  }

}
