import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';

import { FacebookLogin,  FacebookLoginResponse, } from '@capacitor-community/facebook-login';

registerWebPlugin(FacebookLogin);

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  loginForm: FormGroup;
  fbLogin: FacebookLoginPlugin;
  user = null;
  token = null;
  accessToken = 'EAALMNoF8Q0QBAHH6dK6wBr5LUbSYcYSJR1tJjEhpNOpexXy3oZCPysinqJw6BL1V6Gncb6IZAG3A7eQ1ZBLd7mrc2AHw8nYZAeSOqLN5GT9pM0xzUxT5j57mwGfTxcGtRpyf2b51XXK8yRWSBph6TnlHIWLYeZBcIAKP2KQrXjTa3JjAjnakjdV5ZAkve5wrTu2XdrrohTGwZDZD';
  provider = new firebase.auth.FacebookAuthProvider();
  

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    
    
  ) 
  
  { 
    this.setupFbLogin();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  ngOnInit(): void {}

  async goToSignup() {
    this.router.navigate(['/signup']);
  }

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      const { FacebookLogin } = Plugins;
      // this.fbLogin = FacebookLogin;
    }
  }
  async loginFB() {
    const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
  
    const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  
    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      const loading = await this.loadingController.create();
      await loading.present();
      try {
        await this.loadUserData();
        console.log("Logged in Successfully!");
        this.router.navigate(['/facebook']);
      } catch (error) {
        console.log("Login Failed");
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: error.message,
          buttons: ['OK']
        });
        await alert.present();
      } finally {
        await loading.dismiss();
      }
    } else if (result.accessToken && !result.accessToken.userId) {
      this.getCurrentToken();
      console.log("Logged in Successfully!");
      this.router.navigate(['/facebook']);
    } else {
      console.log("Login Failed");
    }
  }
  
  
  async getCurrentToken() {
    const result = await this.fbLogin.getCurrentAccessToken();

    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
    }
  }

  async loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name&access_token=${this.token.token}`;
    console.log('url:', url);
    this.http.get(url).subscribe(async res => {
      console.log('response:', res);
      this.user = res;
      const uid = this.token.userId;
      console.log("User logged in with UID:", uid); // log the UID
      await this.saveUserDataToFirestore(uid); // save the UID to Firestore
      const name = this.user.name;
      const navigationExtras: NavigationExtras = {
        queryParams: { name: name } // set the name parameter to the value of the name property
      };
      this.router.navigate(['/facebook'], navigationExtras);
    });
  }
  
  async logoutFB() {
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }


  async presentFacebookAlert() {
    const alert = await this.alertController.create({
      header: 'Facebook Login',
      message: 'How do you want to login with Facebook?',
      buttons: [
        {
          text: 'Graph API',
          handler: () => {
            console.log('Facebook Graph API');
            this.loginFB();
          }
        },
        {
          text: 'Firebase',
          handler: async () => {
            console.log('Firebase option clicked (good idea!)');
            this.loginWithFacebook();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();
}


  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      loading.dismiss();
      this.router.navigate(['/tabs']);
      // this.router.navigateByUrl('/tabs', { replaceUrl: true });
      console.log("it should navigate");
      
      const user = this.afAuth.auth.currentUser;
      if (user) {
        await this.saveUserDataToFirestore(user.uid); // Save user data to Firestore with UID as document ID
      }

    } catch (error) {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }


  async loginWithTwitter() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      // Use the AngularFireAuth module's signInWithPopup() method with the TwitterAuthProvider
      await this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      loading.dismiss();
      this.router.navigate(['/tabs']);
      console.log("it should navigate");

      const user = this.afAuth.auth.currentUser;
      if (user) {
        await this.saveUserDataToFirestore(user.uid); // Save user data to Firestore with UID as document ID
      }
      
    } catch (error) {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async loginWithFacebook() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await this.afAuth.auth.signInWithPopup(provider);
  
      if (result.user) {
        // Save user data to Firestore with UID as document ID
        await this.saveUserDataToFirestore(result.user.uid);
        loading.dismiss();
        this.router.navigate(['/tabs']);
      }
    } catch (error) {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  
  }
  

  
async saveUserDataToFirestore(uid: string) {
  try {
    const userDocRef = this.afs.collection('users').doc(uid); // Reference to the user document using the UID
    const userData = {
      uid: uid,
    };
    await userDocRef.set(userData); 
  } catch (error) {
    console.error('Error saving user data to Firestore:', error);
  }
}
  
}



