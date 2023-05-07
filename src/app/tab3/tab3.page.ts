import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { ModuleDataService } from '../services/moduledata.service';
import { LecturerDataService } from '../services/lecturerdata.service';
import { AlertController, ModalController } from '@ionic/angular';
import { LecturerModalPage } from '../lecturer-modal/lecturer-modal.page';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  modules: any;
  newModules: any;

  searchTerm: string;

  // router: any;

  constructor(
    private moduledataservice: ModuleDataService,
    private modalController: ModalController,
    private lecturerDataService: LecturerDataService,
    private http: HttpClient,
    private router: Router,
    private logoutService: LogoutService,
    public alertController: AlertController
  ) {}

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

  //navigate to get more information about the module
  navigateToModuleLocation(moduleName: string, long: number, lat: number, credits: number, room: string, location: string, moduleNo: number) {
    console.log('Navigating to location for module:', moduleName);
    this.router.navigate(['/module-location', moduleName, long, lat, credits, room, location, moduleNo]);
}

  //have a random image displayed with the module list item
  async ngOnInit() {
    this.getModuleData();
    await this.loadModuleImages();
  }

  //display modules and also load imagees alongside themm
  getModuleData() {
    this.moduledataservice.getData().subscribe((result) => {
      this.modules = result;
      this.newModules = this.modules.modules;
      this.loadModuleImages();
    });
  }
  async loadModuleImages() {
    if (!this.newModules) {
      return;
    }
  
    //implementing Unsplash API
    for (let i = 0; i < this.newModules.length; i++) {
      const params = new HttpParams()
        .set('query', this.newModules[i].moduleName)
        .set('orientation', 'squarish')
        .set('count', '1');
  
      const response = await this.http
        .get('https://api.unsplash.com/photos/random?query=tech&client_id=3wVzdkoQuL7gs1XvE6Q0ee_JbiZZ5BwaaNUWzxCS_IY', {
          headers: {
            Authorization: 'Client-ID 3wVzdkoQuL7gs1XvE6Q0ee_JbiZZ5BwaaNUWzxCS_IY', //my key, i dont know how to hide this
          },
          params: params,
        })
        .toPromise();
  
      if (response && response[0] && response[0].urls) {
        this.newModules[i].image = response[0].urls.regular;
      } else {
        console.error('Image not loading', this.newModules[i]);
      }
    }
  }

  // Modal for viewing lecturers
  async presentLecturerModal() {
    const modal = await this.modalController.create({
      component: LecturerModalPage,
      componentProps: {
        lecturers: await this.lecturerDataService.getLecturerData().toPromise(),
      },
    });
    return await modal.present();
  }
}
