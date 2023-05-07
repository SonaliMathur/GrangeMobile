import { Injectable } from '@angular/core'; //Use of Injectable
import { HttpClient } from '@angular/common/http'; //Use of HttpClient, used within a service, makes a HTTP request

@Injectable({
  providedIn: 'root'
})
export class ModuleDataService {

  // URL to php file, display modules
  url = 'http://localhost:8888/php_ionic/json-data-modules.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

  // getData() function makes the HTTP request
  getData(){
    return this.http.get(this.url);
  }
}