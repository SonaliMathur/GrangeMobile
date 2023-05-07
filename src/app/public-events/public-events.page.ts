import { Component, OnInit } from '@angular/core';
import { PublicEvent, PublicEventsService } from '../services/public-events.service';

import { AlertController, LoadingController, NavController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { LogoutService } from '../services/logout.service';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";
import { ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { EventinfoComponent } from '../eventinfo/eventinfo.component';

@Component({
  selector: 'app-public-events',
  templateUrl: './public-events.page.html',
  styleUrls: ['./public-events.page.scss'],
})
export class PublicEventsPage implements OnInit {
  presentingElement = undefined;
  publicEvents: PublicEvent[] = [];
  searchTerm: string;
  
  constructor(
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private publicEventservice: PublicEventsService,
    private loadingController: LoadingController,
    private menuController: MenuController,
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController

  ) { }
  ionViewDidEnter() {
    this.menuController.close();
  }

  ngOnInit() {
    this.publicEventservice.getPublicEvents().pipe(
      map(publicEvents => publicEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    ).subscribe(res => {
      this.publicEvents = res;
    });

    this.presentingElement = document.querySelector('.ion-page');
  }

  async removeThePublicEvent(publicEvent: PublicEvent) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            if (publicEvent && publicEvent.id) { 
              this.publicEventservice.removePublicEvent(publicEvent)
                .then(() => {
                  console.log('Event removed successfully');
                  this.showToast('Event has been deleted! :)');
                })
                .catch((error) => {
                  console.log('Error removing event:', error);
                  this.showToast('Error deleting event! :(');
                });
            } else {
              console.log('Invalid note object:', publicEvent);
            }
          }
        }
      ]
    });
    await alert.present();
  }


  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }
  
  isEventPast(publicEventDate: string) {
    const now = new Date();
    const date = new Date(publicEventDate);
    return date < now;
  }

  async openEventModal(publicEvent: PublicEvent) {
    const modal = await this.modalCtrl.create({
      component: EventinfoComponent,
      componentProps: {
        name: publicEvent.name,
        date: publicEvent.date,
        img: publicEvent.imageURL,
        description: publicEvent.description
      }
    });
  
    await modal.present();
  }
  

}
