import { Injectable } from '@angular/core'; //use of Injectable
import { HttpClient} from '@angular/common/http'; //use of HttpClient, used within a service, makes a HTTP request
import { Student } from '../tab2/student'; //goes onto Tab 2 page
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentCreateService {
  getStudents() {
    throw new Error('Method not implemented.');
  }
  //URL to php file, returns an observable, create student php file, this will work with the add button on bottom right
  url = 'http://localhost:8888/php_ionic/json-create-students.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

  //  getData() function for http request
  postData(data: any) {
    return this.http.post(this.url, data, {
      headers: new HttpHeaders({
        'Accept': 'text/plain', 
        'Content-Type': 'text/plain'
      }),
      'responseType': 'text'
      //all of this is to get the data to be sent to the php file as plain text (strings/numbers), there are no imgs here
    });
  }
}