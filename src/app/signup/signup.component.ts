import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  email: FormControl;

  
    

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private afs: AngularFirestore
  ) { 
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  async signup() {
    const loading = await this.loadingController.create();
    await loading.present();
    
  
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    // const uid = this.afAuth.auth.currentUser.uid;
  
    try {
      const { user } = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.afs.collection('users').doc(user.uid).set({ uid: user.uid });
      loading.dismiss();
      this.router.navigate(['/tabs']);
      console.log("it should navigate");
      
    } catch (error) {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Sign up failed',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
      // return this.usersCollection.doc<Users>(id).set({
    }
   
  }


  

  async goToLogin() {
    this.router.navigate(['/login']);
  }

}


 // const uid = credential.user.uid;

 
// private usersCollection: AngularFirestoreCollection<Users>;
// private users: Observable<Users[]>; //observable with an array of userss

// constructor(db: AngularFirestore) { 
//   this.usersCollection = db.collection<Users>('users'); 

//   this.users = this.usersCollection.snapshotChanges().pipe(
//     map(actions => {
//       return actions.map(a => {
//         const data = a.payload.doc.data() as Users;
//         const id = a.payload.doc.id; //access ID of document
//         return { id, ...data };
//       });
//     })
//   );
// }