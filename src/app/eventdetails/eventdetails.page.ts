import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Event, EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';

import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
const {Camera}  = Plugins;

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.page.html',
  styleUrls: ['./eventdetails.page.scss'],
})
export class EventdetailsPage implements OnInit {

  event: Event = {
    id: '',
    name: '',
    date: '',
    description: '',
    userId: '',
    imageURL: null,
    imageFilename: null,
  }

  
  capturedImage = null;
  updateImage = false;
  // eventId = null;

  constructor(
    private eventservice: EventsService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.eventId = this.route.snapshot.params['id'];
    // if (this.eventId) {
    //   this.loadEvent();
    // }
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    console.log(id);
    if (id) {
      console.log(id);
      this.eventservice.getEvent(id).subscribe(event => {
        this.event = event;
        console.log("The URL is " + this.event.imageURL);
        console.log("The Image fileName " + this.event.imageFilename);
        this.updateImage = true;
      });
    }
  }


  async addImage(){
    const image = await Camera.getPhoto(
      {
        quality: 100,
        allowEditing: true,
        source: CameraSource.Photos,
        resultType: CameraResultType.Base64
      }
    );
    console.log("result" , image);
    this.capturedImage = `data:image/png;base64,${image.base64String}`;
    this.event.imageURL = image.base64String;
    this.updateImage = false;
  }

  addEvent() {
    this.eventservice.addEvent(this.event).subscribe(() => {
      // this.router.navigateByUrl('/');
      this.showToast('Your event is added :)');
    }, err => {
      this.showToast('There was a problem adding your event :(');
    });
  }

  updateEvent() {
    this.eventservice.updateEvent(this.event).subscribe(() => {
      this.showToast('Your event was saved :)');
    }, err => {
      this.showToast('There was a problem saving your event :(');
    });
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }



  // async loadEvent () {
  //   const loading = await this.loadingController.create ({
  //     message: 'Loading'
  //   });
  //   await loading.present();

  //   this.eventservice.getEvent(this.eventId).subscribe(res => {
  //     loading.dismiss();
  //     this.event = res;
  //   });
  // }

// async saveEvent() {
//   const loading = await this.loadingController.create({
//     message: 'Saving'
//   });
//   await loading.present();

//   if (this.eventId) {
//     this.eventservice.updateEvent(this.event, this.eventId).then(() => {
//       loading.dismiss();
//     });
//   } else {
//     this.eventservice.addEvent(this.event).then(() => {
//       loading.dismiss();
//     });
//   }
// }


}
