import { Component, OnInit } from '@angular/core';
import { Student } from '../tab2/student';
import { StudentDeleteService } from '../services/studentdelete.service';
import { StudentUpdateService} from '../services/studentupdate.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-deletestudent',
  templateUrl: './deletestudent.page.html',
  styleUrls: ['./deletestudent.page.scss'],
})
export class DeleteStudentPage{

  newStudent = new Student();
  student: any;
  formChanged: boolean;
  operationType: string;
  studentCollection: AngularFirestoreCollection<Student>;
  students: any[];


  constructor(
    private studentdeleteservice: StudentDeleteService, 
    private studentupdateservice: StudentUpdateService,  
    private navParams: NavParams, 
    private modalCtrl: ModalController,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastCtrl: ToastController,
    public alertController: AlertController
     ) {
    
    this.formChanged = false;
    this.newStudent = navParams.get('student');
    this.studentCollection = this.afs.collection<Student>('students');
    this.student = this.navParams.get('student');
  }

  // deleteStudent() {
  //   this.studentdeleteservice.deleteData(this.student.studentID).subscribe(
  //     res => {
  //       console.log("Success: Record has been deleted");
  //       this.operationType = "delete";
  //       this.dismiss(true, this.operationType);
  //       this.showToast('Student record deleted :)'); // Show success toast message for delete
  //     },
  //     err => {
  //       console.log(err.message);
  //       this.showToast('Error deleting record :('); // Show error toast message for delete
  //     }
  //   );
  // }
  
  async deleteStudent() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this student record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.studentdeleteservice.deleteData(this.student.studentID).subscribe(
              res => {
                console.log("Success: Record has been deleted");
                this.operationType = "delete";
                this.dismiss(true, this.operationType);
                this.showToast('Student record deleted :)'); // Show success toast message for delete
              },
              err => {
                console.log(err.message);
                this.showToast('Error deleting record :('); // Show error toast message for delete
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  
  updateStudent() {
    this.studentupdateservice.updateData(this.student).subscribe(
      res => {
        console.log("Success: Record has been updated");
        this.operationType = "update";
        this.dismiss(true, this.operationType);
        this.showToast('Student record updated :)'); // Show success toast message for update
      },
      err => {
        console.log(err.message);
        this.showToast('Error updating record :('); // Show error toast message for update
      }
    );
  }
  

  dismiss(returnStudent: boolean, operation: string) {
    if (returnStudent) {
      this.modalCtrl.dismiss({student: this.student, operation: operation});
    } else {
      this.modalCtrl.dismiss();
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }

}


// deleteStudent() {
  //   const userId = firebase.auth().currentUser.uid;
  
  //   // Delete from Firestore
  //   this.firestore.collection('students').doc(String(this.student.studentID)).delete()
  //     .then(() => {
  //       console.log('Student deleted from Firestore');
  
  //       // Wait for 1 second before proceeding to delete from PHP
  //       setTimeout(() => {
  //         // Delete from PHP
  //         this.studentdeleteservice.deleteData(this.student.studentID).subscribe(
  //           res => {
  //             console.log('Student deleted from PHP');
  //             this.operationType = 'delete';
  //             this.dismiss(true, this.operationType);
  //           },
  //           async err => {
  //             console.log(err.message);
  //           }
  //         );
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting student from Firestore: ', error);
  //     });
  // }

  // firestoreDeleteStudent() {
//   const userId = firebase.auth().currentUser.uid;

//   // Get a reference to the "students" collection
//   const studentsCollection = this.firestore.collection('students');

//   // Use the "get" method to retrieve all documents in the collection
//   studentsCollection.get().toPromise().then((querySnapshot) => {
//     // Use the "forEach" method to loop through each document and delete it
//     querySnapshot.forEach((doc) => {
//       doc.ref.delete();
//       console.log('Document deleted from Firestore');
//     });

//     // Remove all students from the array used to display the list of students
//     this.students = [];
//   }).catch((error) => {
//     console.error('Error deleting students from Firestore: ', error);
//   });
// }
