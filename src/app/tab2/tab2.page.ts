import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../services/studentdata.service'; //studentdata.service.ts imported, can display info from database
import { Router, NavigationExtras, Data } from '@angular/router';
import { DeleteStudentPage } from '../deletestudent/deletestudent.page'; //delete student page imported
import { AddStudentPage} from '../addstudent/addstudent.page'; //add student page imported
import { Student } from '../tab2/student'
import { ModalController } from '@ionic/angular';
import { LogoutService } from '../services/logout.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  searchTerm: string;
  // studentSearch: [];
  students: any;
  newStudents: any;

  newStudent = new Student();
  constructor(
    private studentdataservice: StudentDataService, 
    private router: Router, 
    private modalCtrl: ModalController,
    private logoutService: LogoutService,
    public alertController: AlertController
    ) { }

        async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Log Out',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Logout',
            role: 'confirm',
            handler: async () => {
              await this.logoutService.logout();
            }
          }
        ]
      });
    
      await alert.present();
    }

  getStudentData() {
    // Get the information from the API using Observable
    // by subscribing to the studentservice Observable 
    this.studentdataservice.getData().subscribe(result => {
    this.students = result;
    this.newStudents = this.students.students;
    console.log(this.newStudents);

    });
  }

  async deleteStudent(student: any) {
    const modal = await this.modalCtrl.create({
      component: DeleteStudentPage,
      componentProps: { student: student }
    });
    modal.onDidDismiss().then(data => {
      if (data['data']) {
        if (data['data']['operation'] == "delete"){
          this.removeStudent(data['data']['student'])
          console.log(data['data']['operation']);
        } else if (data['data']['operation'] == "update") {
          this.updateStudentList(data['data']['student'])
        }

      } else {
        console.log("Modal Cancelled");
      }
    });
    return await modal.present();
  }

  removeStudent(theStudent: Student){
    let listIndex = this.newStudents.indexOf(theStudent);
    this.newStudents.splice(listIndex, 1);
    console.log("Student removed at index: " + listIndex);
  }

  updateStudentList(theStudent: Student) {
    if (!this.newStudents || !Array.isArray(this.newStudents)) {
      console.error("newStudents array is not properly initialized.");
      return;
    }
  
    let listIndex = this.newStudents.indexOf(theStudent);
    if (listIndex === -1) {
      console.error("theStudent not found in newStudents array.");
      return;
    }
  
    // Update the student object in the newStudents array
    this.newStudents[listIndex] = theStudent;
    console.log("Student updated at index: " + listIndex);
  }

  async addStudent() {
    const modal = await this.modalCtrl.create({
      component: AddStudentPage   
     });
    modal.onDidDismiss().then(data => {
      if(data['data']){
        this.newStudents.push(data['data']);
        console.log(data['data']); 
      }else{
        console.log("Modal Cancelled");
      }
          
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getStudentData();
  }

}





// import { Component, OnInit } from '@angular/core';
// import { StudentDataService } from '../services/studentdata.service'; //studentdata.service.ts imported, can display info from database
// import { Router, NavigationExtras, Data } from '@angular/router';
// import { DeleteStudentPage } from '../deletestudent/deletestudent.page'; //delete student page imported
// import { AddStudentPage} from '../addstudent/addstudent.page'; //add student page imported
// import { Student } from '../tab2/student'
// import { ModalController } from '@ionic/angular';
// import { AlertController, LoadingController } from '@ionic/angular';
// import { LogoutService } from '../services/logout.service';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { first } from 'rxjs/operators';

// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss']
// })
// export class Tab2Page implements OnInit {

//   searchTerm: string;
//   // studentSearch: [];
//   students: any;
//   newStudents: Student[] = [];
//   students$: Observable<Student[]>;
  

//   newStudent = new Student();
//   constructor(
//     private studentdataservice: StudentDataService, 
//     private router: Router, 
//     private modalCtrl: ModalController, 
//     public alertController: AlertController,
//     private loadingController: LoadingController,
//     private logoutService: LogoutService,
//     private firestore: AngularFirestore
//     ) { }

//     getStudents(): Observable<Student[]> {
//       return this.firestore.collection<Student>('students').valueChanges();
//     }

//     async presentAlert() {
//       const alert = await this.alertController.create({
//         header: 'Log Out',
//         message: 'Are you sure you want to logout?',
//         buttons: [
//           {
//             text: 'Cancel',
//             role: 'cancel',
//             handler: () => {
//               console.log('Cancel clicked');
//             }
//           },
//           {
//             text: 'Logout',
//             role: 'confirm',
//             handler: async () => {
//               await this.logoutService.logout();
//             }
//           }
//         ]
//       });
    
//       await alert.present();
//     }


//   // getStudentData() {
//   //   // MY PHP DATA
//   //   this.studentdataservice.getData().subscribe(result => {
//   //     this.students = result;
//   //     this.newStudents = this.students.students;
//   //     console.log(this.newStudents);
//   //   });
  
//   //   // FIRESTORE DATA
//   //   this.firestore.collection<Student>('students').valueChanges().subscribe(data => {
//   //     console.log('Firestore students:', data);
//   //     this.newStudents = this.newStudents.concat(data);
//   //     console.log('Merged students:', this.newStudents);
//   //   });
//   // }
//   getStudentData() {
//     // MY PHP DATA
//     this.studentdataservice.getData().subscribe(result => {
//       this.students = result;
//       this.newStudents = this.students.students;
//       console.log(this.newStudents);
//     });
  
//     // FIRESTORE DATA
//     this.firestore.collection<Student>('students').valueChanges().pipe(
//       first() // Complete the observable after the first emission
//     ).subscribe(data => {
//       console.log('Firestore students:', data);
//       this.newStudents = this.newStudents.concat(data);
//       console.log('Merged students:', this.newStudents);
//     });
//   }

//   async deleteStudent(student: any) {
//     const modal = await this.modalCtrl.create({
//       component: DeleteStudentPage,
//       componentProps: { student: student }
//     });

//     modal.onDidDismiss().then(data => {
//       if (data['data']) {
//         if (data['data']['operation'] == "delete"){
//           this.removeStudent(data['data']['student'])
//           console.log(data['data']['operation']);
//         } else if (data['data']['operation'] == "update") {
//           this.updateStudentList(data['data']['student'])
//         }

//       } else {
//         console.log("Modal Cancelled");
//       }
//     });
//     return await modal.present();
//   }
 
// //   removeStudent(theStudent: Student){
// //     let listIndex = this.newStudents.indexOf(theStudent);
// //     this.newStudents.splice(listIndex, 1);
// //     console.log("Student removed at index: " + listIndex);

// //     // Delete the student from Firestore
// //     this.firestore.collection('students').doc(theStudent.studentID.toString()).delete().then(() => {
// //       console.log("Student deleted from Firestore");
// //     }).catch((error) => {
// //       console.log("Error deleting student from Firestore: ", error);
// //     });
// // }

// // removeStudent(theStudent: Student){
// //   let listIndex = this.newStudents.indexOf(theStudent);
// //   this.newStudents.splice(listIndex, 1);
// //   console.log("Student removed at index: " + listIndex);

// //   // Delete the student from Firestore
// //   this.firestore.collection('students').doc(theStudent.studentID.toString()).delete().then(() => {
// //     console.log("Student deleted from Firestore");
// //   }).catch((error) => {
// //     console.log("Error deleting student from Firestore: ", error);
// //   });
// // }

// removeStudent(theStudent: Student){
//   // get the index of the student in the array
//   let listIndex = this.newStudents.indexOf(theStudent);

//   // remove the student from the array
//   this.newStudents.splice(listIndex, 1);
//   console.log("Student removed at index: " + listIndex);

//   // get a reference to the specific document to delete
//   const studentRef = this.firestore.collection('students').doc(theStudent.studentID.toString());
//   console.log("Deleting student with ID: " + theStudent.studentID.toString());

//   studentRef.delete().then(() => {
//     console.log("Student deleted from Firestore");
//   }).catch((error) => {
//     console.log("Error deleting student from Firestore: ", error);
//   });
// }


//   updateStudentList(theStudent: Student) {
//     let listIndex = this.newStudents.indexOf(theStudent);
//     this.newStudents[listIndex] = theStudent;
//     console.log("Student updated at index: " + listIndex);
//   }
//   async addStudent() {
//     const modal = await this.modalCtrl.create({
//       component: AddStudentPage   
//      });
//     modal.onDidDismiss().then(data => {
//       if(data['data']){
//         this.newStudents.push(data['data']);
//         console.log(data['data']); 
//       }else{
//         console.log("Modal Cancelled");
//       }
          
//     });
//     return await modal.present();
//   }


//   ngOnInit() {
//     this.getStudentData();
//     this.getStudents();

//     const students = this.getStudents();
  
//     students.subscribe(students => {
//       console.log('Retrieved students:', students);
//       this.students = students;
//     });
  
//     this.firestore.collection('students').valueChanges().subscribe((data) => {
//       this.students = Object.values(data);
//     });
//   }}

