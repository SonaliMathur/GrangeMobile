import { Injectable, Query } from '@angular/core'; //use of @Injectable() for reusability
import { HttpClient } from '@angular/common/http'; //Use of HttpClient, used within a service, makes a HTTP request
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentDeleteService {
  // URL to php file, returns an observable, delete student php, CRUD operation
  url = 'http://localhost:8888/php_ionic/json-delete-student.php';

  // Inject HttpClient module into Constructor
  constructor(
    private http: HttpClient,
    ) { }
    

  deleteData(data: any) {
    // alert(data);
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
