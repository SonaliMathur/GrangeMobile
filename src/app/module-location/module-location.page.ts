import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import * as L from "leaflet";

import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';


@Component({
  selector: 'app-module-location',
  templateUrl: './module-location.page.html',
  styleUrls: ['./module-location.page.scss'],
})
export class ModuleLocationPage implements OnInit {
  moduleName: string;
  moduleNo: number;
  long: number;
  lat: number;
  room: string;
  credits: number;
  location: string;

  map: L.Map;
  marker: L.Marker;
  addHomeMarker: any;


  constructor(private route: ActivatedRoute, private modalController: ModalController) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.moduleName = this.route.snapshot.paramMap.get('moduleName');
      this.moduleNo = +params.get('moduleNo');
      this.long = +params.get('long');
      this.lat = +params.get('lat');
      this.room = this.route.snapshot.paramMap.get('room');
      this.credits = +params.get('credits');
      this.location = this.route.snapshot.paramMap.get('location');
  
      if (!this.map || typeof this.map === 'undefined') {
        // Map is not initialized yet, so initialize it
        this.map = L.map('map', {
          center: [this.lat, this.long],
          zoom: 15,
          renderer: L.canvas()
        });

    let tileLayerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    if (document.body.getAttribute('color-theme') === 'dark') {
      tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
  
    L.tileLayer(tileLayerUrl, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

        setTimeout(() => {
          this.map.invalidateSize();
        }, 0);
  
        const customIcon = L.icon({
          iconUrl: 'assets/myMarkerIcon.png',
          iconSize: [38, 38],
          iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
        });
  
        this.marker = L.marker([this.lat, this.long], {
          icon: customIcon
        });
  
        this.marker.bindPopup(`<b>${this.moduleName}</b><br><b>Campus: </b>${this.location}<br><b>Room: </b>${this.room}`);
  
        L.circle({lat: this.lat, lng: this.long}, {
          color: '#4197E7',
          fillColor: '#4197E7',
          fillOpacity: 0.2,
          radius: 70
        }).addTo(this.map);
  
      } else {
        // Map is already initialized, just update the marker's position
        this.marker.setLatLng([this.lat, this.long]);
      }
  
      if (this.map) {
        // Map is already initialized, add the marker to it
        this.marker.addTo(this.map);
      }
  
    });
  }
  //closing/dismissing the modal
  async dismiss(value: boolean) {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.dismiss(value);
    }
  }
  ngOnDestroy() {
    this.map.remove();
  }
}