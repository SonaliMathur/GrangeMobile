import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything?q=grangegorman&sortBy=publishedAt&apiKey=57836489c6f24c28a1987d511634dee0';
  
  constructor(private http: HttpClient) { }

  //trying to only get the latest 4 articles, it can also have live updates when new articles are added
  getLatestArticles(numArticles: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&pageSize=${numArticles}`);
  }
  // getArticleById(articleTitle: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}&q=${encodeURIComponent(articleTitle)}`);
  // }
  

}
