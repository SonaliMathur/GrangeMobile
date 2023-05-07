import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModuleDataService } from '../services/moduledata.service';

import * as L from "leaflet";
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  @ViewChild('map2', { static: true }) mapElement: ElementRef;
  
  modules: any;
  newModules: any;

  searchTerm: string;

  long: number;
  lat: number;
  location: string;
  
  map2: L.Map;
  marker: L.Marker;


  constructor(
    private moduledataservice: ModuleDataService,
    private modalController: ModalController,
    private http: HttpClient,
    private router: Router,
    private logoutService: LogoutService,
    public alertController: AlertController
  ) {}

    changeTileLayerUrl(theme: string) {
    let tileLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    if (theme === 'dark') {
      tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
    this.map2.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl(tileLayerUrl);
      }
    });
  }

  toggleTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      this.changeTileLayerUrl('dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
      this.changeTileLayerUrl('light');
    }
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
            await this.logoutService.logout();
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  ngOnInit(): void {
    if (document.getElementById('map2')) {
      this.initializeMap();
    }
  }

  initializeMap() {
    this.map2 = L.map('map2', {
      center: [53.3498, -6.2603],
      zoom: 13,
      renderer: L.canvas()
    });
  
    let tileLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    if (document.body.getAttribute('color-theme') === 'dark') {
      tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
  
    L.tileLayer(tileLayerUrl, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map2);
  
  

    setTimeout(() => {
      this.map2.invalidateSize();
    }, 0);
  
    const customIcon = L.icon({
      iconUrl: 'assets/myMarkerIcon.png',
      iconSize: [38, 38], 
      iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
    });
  
    this.moduledataservice.getData().subscribe((result) => {
      this.modules = result;
      this.newModules = this.modules.modules;
      console.log(this.newModules);
  
      // Loop through newModules array and add markers for each module
      this.newModules.forEach((module) => {
        const marker = L.marker([module.lat, module.long], { icon: customIcon }).addTo(this.map2);
        marker.bindPopup(`Location: ${module.location}`);
      });
    });
  }
  ngOnDestroy() {
    this.map2.remove();
  }
}


 // initializeMap() {
  //   this.map2 = L.map('map2', {
  //     center: [53.3498, -6.2603],
  //     zoom: 13,
  //     renderer: L.canvas()
  //   });

    
  
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map2);

    

    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   // dark mode
    //   L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //     maxZoom: 18,
    //     attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //   }).addTo(this.map2);
    // } else {
    //   // light mode
    //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 18,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //   }).addTo(this.map2);
    // }
