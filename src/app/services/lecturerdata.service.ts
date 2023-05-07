import { Injectable } from '@angular/core'; //Use of Injectable
import { HttpClient } from '@angular/common/http'; //Use of HttpClient, used within a service, makes a HTTP request
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from "@angular/fire/storage";

// Needed to create reference to cloud stotage and make url 
import { AngularFireStorageReference } from '@angular/fire/storage';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import { AngularFireAuthGuard} from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/auth';


export interface Lecturer {
  staffNumber?: string,
  firstName: string,
  lastName: string,
  moduleNo1: string,
  moduleNo2: string,
  email: string,
  imageURL: string,
  imageFilename: string,
  createdBy: string,
  createdAt?: firebase.firestore.FieldValue;
}


@Injectable({
  providedIn: 'root'
})
export class LecturerDataService {

  private lecturers: Observable<Lecturer[]>;
  private lecturersCollection: AngularFirestoreCollection<Lecturer>;

  url = 'http://localhost:8888/php_ionic/json-data-lecturers.php';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
    ) { }

  // getData() function makes the HTTP request
  getLecturerData(){
    return this.http.get(this.url);
  }
}