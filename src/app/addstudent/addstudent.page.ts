import { Component, OnInit } from '@angular/core';
import { Student } from '../tab2/student';
import { StudentCreateService } from '../services/studentcreate.service';
import { Location } from '@angular/common';
//import { Router } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddStudentPage{

  newStudent = new Student();

  constructor(
    private studentcreateservice: StudentCreateService, 
    private location: Location, private router: Router , 
    private viewCtrl: ModalController,
    private toastCtrl: ToastController
    ) { }

  // Method that uses the student create service to post data to the database via php
  addStudent() {

    this.studentcreateservice.postData(this.newStudent).subscribe(
      res => {
        console.log("Student Added" + res);
        //this.moveBack();
        this.showToast('Student has been added :)');
        this.dismiss(true);
      },
      async err => {
        console.log(err.message);
        this.showToast('Error adding student :(');
      }
    );
  }

  // Now dismiss the modal and pass the created student back to
  // the tab1 page so that we can add the studen to the list
  dismiss(returnStuden: boolean) {
    if (returnStuden){
      this.viewCtrl.dismiss(this.newStudent);
    }else{
      this.viewCtrl.dismiss();
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }
}




// import { Component, OnInit } from '@angular/core';
// import { Student } from '../tab2/student';
// import { StudentCreateService } from '../services/studentcreate.service';
// import { Location } from '@angular/common';
// //import { Router } from '@angular/router';
// import { Router, NavigationExtras } from '@angular/router';
// import { ModalController } from '@ionic/angular';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
// import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
// import { map, take } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import * as firebase from 'firebase/app';
// import { AngularFireStorage } from "@angular/fire/storage";

// import { AngularFireStorageReference } from '@angular/fire/storage';
// import { from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { Tab2Page } from '../tab2/tab2.page';

// @Component({
//   selector: 'app-addstudent',
//   templateUrl: './addstudent.page.html',
//   styleUrls: ['./addstudent.page.scss'],
// })
// export class AddStudentPage{

//   newStudent = new Student();
//   students: Student[] = [];
//   student: Observable<any[]>;

//   constructor(
//     private studentcreateservice: StudentCreateService, 
//     private location: Location, 
//     private router: Router, 
//     private viewCtrl: ModalController,
//     private db: AngularFireDatabase,
//     public afAuth: AngularFireAuth,
//     private firestore: AngularFirestore,
    
//     ) { }

//     ngOnInit() {
//     // this.getStudents().subscribe(students => {
//     //   this.students = students;

// }

// addStudent() {
//   const userId = firebase.auth().currentUser.uid;
//   const studentObj = Object.assign({}, this.newStudent);
//   // delete studentObj.id; 
//   this.firestore.collection('students').add(studentObj)
//     .then(() => {
//       console.log('Student added');
//       this.dismiss(true);
//     })
//     .catch((error) => {
//       console.error('Error adding student: ', error);
//     });
// }


//   dismiss(returnStuden: boolean) {
//     if (returnStuden){
//       this.viewCtrl.dismiss(this.newStudent);
//     }else{
//       this.viewCtrl.dismiss();
//     }
//   }
// }

