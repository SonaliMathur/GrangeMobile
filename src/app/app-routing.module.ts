import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';
import { LoginPagePage } from './login-page/login-page.page';
import { LoginPagePageModule } from './login-page/login-page.module';
import { TabsPage } from './tabs/tabs.page';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { SignupComponent } from './signup/signup.component';
import { FacebookPage } from './facebook/facebook.page';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/tabs']);

const routes: Routes = [
  { path: 'facebook', component: FacebookPage },

  {
    path: 'facebook-page/:name',
    component: FacebookPage
  },
  {
    path: '',
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectLoggedInToHome },
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'signup', 
    component: SignupComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'addstudent',
    loadChildren: () => import('./addstudent/addstudent.module').then( m => m.AddstudentPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'deletestudent',
    loadChildren: () => import('./deletestudent/deletestudent.module').then( m => m.DeletestudentPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'lecturer-modal',
    loadChildren: () => import('./lecturer-modal/lecturer-modal.module').then( m => m.LecturerModalPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'module-location/:moduleName/:long/:lat/:credits/:room/:location/:moduleNo',
    loadChildren: () => import('./module-location/module-location.module').then(m => m.ModuleLocationPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'details',
    loadChildren: () => import('./todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule),
  },
  {
    path: 'facebook',
    loadChildren: () => import('./facebook/facebook.module').then( m => m.FacebookPageModule)
  },
  {
    path: 'eventdetails',
    loadChildren: () => import('./eventdetails/eventdetails.module').then( m => m.EventdetailsPageModule)
  },
  {
    path: 'eventdetails/:id',
    loadChildren: () => import('./eventdetails/eventdetails.module').then( m => m.EventdetailsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'news-information',
    loadChildren: () => import('./news-information/news-information.module').then( m => m.NewsInformationPageModule)
  },
  {
    path: 'public-events',
    loadChildren: () => import('./public-events/public-events.module').then( m => m.PublicEventsPageModule)
  },
  {
    path: 'public-events-details',
    loadChildren: () => import('./public-events-details/public-events-details.module').then( m => m.PublicEventsDetailsPageModule)
  },
  {
    path: 'public-events-details/:id',
    loadChildren: () => import('./public-events-details/public-events-details.module').then( m => m.PublicEventsDetailsPageModule)
  },
  {
    path: 'event-description',
    loadChildren: () => import('./event-description/event-description.module').then( m => m.EventDescriptionPageModule)
  },
  {
    path: 'email-modal',
    loadChildren: () => import('./email-modal/email-modal.module').then( m => m.EmailModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AngularFireAuthGuardModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}



// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { Tab1Page } from './tab1/tab1.page';
// import { LoginPagePage } from './login-page/login-page.page';
// import { LoginPagePageModule } from './login-page/login-page.module'
// import { TabsPage } from './tabs/tabs.page';
// import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/auth-guard' 
// import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
// import { SignupComponent } from './signup/signup.component';



// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['/tabs']);

// const routes: Routes = [
// {
//   path: '',
//   canActivate: [AngularFireAuthGuard],
//     data: { authGuardPipe: redirectLoggedInToHome },
//   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
// },
// { path: 'signup', 
//   component: SignupComponent },
// {
//     path: 'login',
//     loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule),
// },
//   {
//     path: 'tab1',
//     loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule),
//   },
//   {
//     path: 'addstudent',
//     loadChildren: () => import('./addstudent/addstudent.module').then( m => m.AddstudentPageModule)
//   },
//   {
//     path: 'deletestudent',
//     loadChildren: () => import('./deletestudent/deletestudent.module').then( m => m.DeletestudentPageModule)
//   },
//   {
//     path: 'lecturer-modal',
//     loadChildren: () => import('./lecturer-modal/lecturer-modal.module').then( m => m.LecturerModalPageModule)
//   },
//   {
//     path: 'module-location/:moduleName/:long/:lat/:credits/:room/:location/:moduleNo',
//     loadChildren: () => import('./module-location/module-location.module').then(m => m.ModuleLocationPageModule)
//   },
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
//     AngularFireAuthGuardModule
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}






//   {
//     path: 'tab2',
//     loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
//   },
//   {
//     path: 'tab3',
//     loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
//   },
//   {
//     path: 'tab4',
//     loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
//   },
//   {
//     path: 'tab5',
//     loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
//   },


//   {
//     path: '',
//     redirectTo: 'tabs',
//     pathMatch: 'full'
// },

    // ...canActivate(redirectLoggedInToHome)    // ...canActivate(redirectLoggedInToHome)
        // ...canActivate(redirectUnauthorizedToLogin)