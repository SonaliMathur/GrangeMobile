import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LogoutService } from './services/logout.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private logoutService: LogoutService,
    public alertController: AlertController,
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.router.navigateByUrl('/login');
    });
  }

  toggleTheme(event) {
    if(event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
    }else {
      document.body.setAttribute('color-theme', 'light')
    }
  }
  // async logout() {
  //   await this.logoutService.logout();
  // }

  async logout() {
    await this.logoutService.logout();
    this.menuController.close();
  }

  closeMenu() {
    this.menuController.close();
    console.log("Menu closed")
  }

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
            // await this.logoutService.logout();
            await this.logout();
          }
        }
      ]
    });
  
    await alert.present();
  }
}
