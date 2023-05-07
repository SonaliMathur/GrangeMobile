import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.scss'],
})
export class EventinfoComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

}
