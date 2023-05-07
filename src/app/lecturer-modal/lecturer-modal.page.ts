import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LecturerDataService } from '../services/lecturerdata.service';
import { EmailModalPage } from '../email-modal/email-modal.page';

@Component({
  selector: 'app-lecturer-modal',
  templateUrl: './lecturer-modal.page.html',
  styleUrls: ['./lecturer-modal.page.scss'],
})
export class LecturerModalPage implements OnInit {
  lecturers: any;
  newLecturers: any;
  selectedLecturer: any;

  constructor(
    private modalController: ModalController,
    private lecturerDataService: LecturerDataService
  ) {}

  getLectureDataInfo() {
    this.lecturerDataService.getLecturerData().subscribe((result) => {
      this.lecturers = result;
      this.newLecturers = this.lecturers.lecturers;
    });
  }

  ngOnInit() {
    this.getLectureDataInfo();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openEmailModal(lecturer: any) {
    const modal = await this.modalController.create({
      component: EmailModalPage,
      componentProps: { email: lecturer.email }
    });
    return await modal.present();
  }
}
