// import { Injectable } from '@angular/core';
// import { ToastController } from '@ionic/angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class ToastService {

//   private myToast: any;

//   constructor(
//     private toast: ToastController
//   ) {  }
  
//   showToast(msg) {
//     this.myToast.create({
//       message: msg,
//       duration: 3000
//     }).then(toast => toast.present());
//   }

//   HideToast() {
//     this.myToast = this.toast.dismiss();
//   }

// }

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastController
  ) {  }
  
  showToast(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }

  HideToast() {
    this.toast.dismiss();
  }
}
