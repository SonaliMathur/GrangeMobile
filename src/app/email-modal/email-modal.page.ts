import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.page.html',
  styleUrls: ['./email-modal.page.scss'],
})
export class EmailModalPage implements OnInit {
  @Input() email: string;
  emailSubject: string = '';
  emailBody: string = '';
  

  constructor(private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit(
  ) {      console.log(this.email);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async sendEmail() {
    // Check if email subject or body is empty
    if (!this.emailSubject.trim() || !this.emailBody.trim()) {
      const toast = await this.toastController.create({
        message: 'Subject and/or body cannot be empty',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    console.log(`Email to ${this.email} subject: ${this.emailSubject} and body: ${this.emailBody}`);

    const toast = await this.toastController.create({
      message: 'Email sent!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
    this.dismiss();
  }
    
}
