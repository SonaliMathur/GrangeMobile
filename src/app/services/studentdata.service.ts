import { Injectable } from '@angular/core'; //use of @Injectable() for reusability
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' //Injectable() is used to make a service reusable
})
export class StudentDataService {
  getStudents() {
    throw new Error('Method not implemented.');
  }

  // URL to php file, returns an observable, display students
  url = 'http://localhost:8888/php_ionic/json-data-students.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

  // Create getData() function thats makes http request
  getData(){
    return this.http.get(this.url);
  }
}

