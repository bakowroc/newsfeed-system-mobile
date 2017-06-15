import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http'
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'news-page',
  templateUrl: 'newspage.html'
})
export class NewsPage implements OnInit {

    news: any;
    current_user: any;
    comment_body: Object;

  constructor(
      private http: Http,
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage
        ) {

            this.comment_body = {
                author: '',
                content: '',
                related_news: ''

            }
        }

  ngOnInit(){

    this.getNews()
        .subscribe((response)=>this.news = response);

    this.getLoggedUser()
        .subscribe((response)=>this.current_user = response);

  }

  getNews(){

      let param = this.navParams.get('newsId');

      return this.http
        .get('http://news-feed-system.herokuapp.com/api/news/' + param + '/')
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

  addComment(){

      this.comment_body['author'] = this.current_user.id;
      this.comment_body['related_news']= this.navParams.get('newsId');

      console.log(this.comment_body);
      this.preparePostRequest('comments', this.comment_body, true)
            .subscribe((response)=>{
                this.getNews()
                    .subscribe((response)=>{

                        this.news = response;

                    });
            });

  }

  reverseArray(input){

      return input.reverse();

  }

  preparePostRequest(path: string, object: Object, secured: boolean){

      return this.getAuthHeaders().flatMap(token => {

         let headers = new Headers();

         if(secured){
             headers.append('Authorization', 'JWT ' + token);
        }

         return this.http.post('http://news-feed-system.herokuapp.com/api/'+ path +'/create/', object, {headers: headers})
                    .map((res: Response) => res.json());

                });
    }
}
