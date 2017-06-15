import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    news: any;

  constructor(private http: Http) {

  }

  ngOnInit(){

      this.getNews()
            .subscribe((response)=>this.news = response);

  }

  getNews(){

      return this.http
        .get('http://127.0.0.1:8000/api/news/')
        .map((res: Response) => res.json());

  }

}
