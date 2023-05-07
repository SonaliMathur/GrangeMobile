import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PublicEvent, PublicEventsService } from '../services/public-events.service';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';

import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
const {Camera}  = Plugins;

@Component({
  selector: 'app-public-events-details',
  templateUrl: './public-events-details.page.html',
  styleUrls: ['./public-events-details.page.scss'],
})
export class PublicEventsDetailsPage implements OnInit {

  publicEvent: PublicEvent = {
    id: '',
    name: '',
    date: '',
    description: '',
    createdAt: '',
    imageURL: null,
    imageFilename: null,
  }

  
  capturedImage = null;
  updateImage = false;

  constructor(
    private publicEventservice: PublicEventsService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); 
    console.log(id);
    if (id) {
      console.log(id);
      this.publicEventservice.getPublicEvent(id).subscribe(publicEvent => {
        this.publicEvent = publicEvent;
        console.log("The URL is " + this.publicEvent.imageURL);
        console.log("The Image fileName " + this.publicEvent.imageFilename);
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
    this.publicEvent.imageURL = image.base64String;
    this.updateImage = false;
  }

  addPublicEvent() {
    this.publicEventservice.addPublicEvent(this.publicEvent).subscribe(() => {
      this.showToast('Your event is added :)');
    }, err => {
      this.showToast('There was a problem adding the event :(');
    });
  }

  updatePublicEvent() {
    this.publicEventservice.updatePublicEvent(this.publicEvent).subscribe(() => {
      this.showToast('The event is saved :)');
    }, err => {
      this.showToast('There was a problem saving the event :(');
    });
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
