import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.menuController.close();
  }
}
