import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

// These Modules had to be added here and to the imports array to ensure that the Model would work for adding and deleteing students
import { AddstudentPageModule } from '../app/addstudent/addstudent.module';
import { DeletestudentPageModule } from '../app/deletestudent/deletestudent.module';
import { LecturerModalPage } from './lecturer-modal/lecturer-modal.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFirestoreModule } from '@angular/fire/firestore';  
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
// Required for the Auth Login redirect
import { AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
// Required for Registration and login
import { AngularFireAuthModule} from '@angular/fire/auth';


import { LoginPagePageModule } from './login-page/login-page.module';
import { Tab1PageModule } from './tab1/tab1.module';
import { LoginPagePage } from './login-page/login-page.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SignupComponent } from './signup/signup.component';
import { FacebookPageModule } from './facebook/facebook.module';
import { EmailModalPage } from './email-modal/email-modal.page';

// import { CalendarModule } from 'ion2-calendar';
// import { NgCalendarModule  } from 'ionic2-calendar';




@NgModule({
  declarations: [AppComponent, LecturerModalPage, SignupComponent, EmailModalPage],
  entryComponents: [LecturerModalPage, LoginPagePage, EmailModalPage],
  
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AddstudentPageModule, DeletestudentPageModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    AngularFireStorageModule, 
    AngularFireAuthGuardModule,
    AngularFireAuthModule,
    LoginPagePageModule,
    Tab1PageModule,
    RouterModule,

    // NgCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    FacebookPageModule,
    AngularFireDatabaseModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    NavController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
