import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingController: LoadingController
  ) { }


async logout() {
  const loading = await this.loadingController.create();
  await loading.present();

  // Clear the cache
  if ('caches' in window) {
    caches.keys().then(function (names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }

  // Using the Firebase API to sign out
  this.afAuth.auth.signOut().then(() => {
    loading.dismiss();
    this.router.navigate(['/login']);
  });
}
}


//   async logout() {
//     const loading = await this.loadingController.create();
//     await loading.present();

//     //using the Firebase api to signout
//     this.afAuth.auth.signOut().then(() => {
//       loading.dismiss();
//       this.router.navigate(['/login']);
//     });
//   }
// }