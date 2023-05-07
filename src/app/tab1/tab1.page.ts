import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LogoutService } from '../services/logout.service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  articles: any[];

  tweets = [];
  segment = 'home';
  opts = {
    slidesPerView: 4.5,
    spaceBetween: 11,
    slidesOffsetBefore: 0
  };

  slideOpts = {
    slidesPerView: 1.15,
    spaceBetween: 0,
    slidesOffsetBefore: 0,
    touchRatio: 0.2,
    touchAngle: 45
  };


  factsOpts = {
    slidesPerView: 1.15,
    spaceBetween: 0,
    slidesOffsetBefore: 0,
    touchRatio: 0.2,
    touchAngle: 45
  };


  constructor(

    public alertController: AlertController,
    private http: HttpClient,
    private newsService: NewsService,
    private router: Router

    ) {}
    
    //making a call using http GET
    ngOnInit() {
      this.newsService.getLatestArticles(4).subscribe(
        data => {
          this.articles = data.articles;
        },
        error => {
          console.log(error);
        }
      );

      this.http.get('https://devdactic.fra1.digitaloceanspaces.com/twitter-ui/tweets.json').subscribe((data: any) => {
        console.log('tweets: ', data.tweets);
        this.tweets = data.tweets;
      });
    }


    readMore(article: any) {
      // navigate to the NewsInformationPage
      this.router.navigate(['/news-information'], { state: { article: article } });
    }
    
    
  
}

