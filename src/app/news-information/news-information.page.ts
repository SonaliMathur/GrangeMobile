import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-information',
  templateUrl: './news-information.page.html',
  styleUrls: ['./news-information.page.scss'],
})
export class NewsInformationPage implements OnInit {
  article: any;
  fullArticleData: any;

  id: string;
  name: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  content: string;
  url: string;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  this.article = history.state.article;

 

  
}}

