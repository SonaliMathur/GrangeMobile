import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentUpdateService {
  // Create url to json-delete-student
  url = 'http://localhost:8888/php_ionic/json-update-student.php';

  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

  // Create updateData() function thats makes http post
  // request to delete a student. We use post instead of delete
  // because we are using a basic php backend that required a 
  // studentID to delete the database record
  updateData(data: any) {
    // Make http request using Http Client;
    // alert(data);
    return this.http.post(this.url, data, {
      headers: new HttpHeaders({
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      }),
      'responseType': 'text'
    });
  }
}