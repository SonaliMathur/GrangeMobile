import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LogoutService } from '../services/logout.service';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";
import { ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Event, EventsService } from '../services/events.service';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit{
  // todos: Todo[]; //our to do array from the to do service
  // todos: Observable<Todo[]>;
  todos: Observable<Todo[]>;

  events: Event[];

  // completedTodos: Todo[];
  selectedSegment: string = 'tasks';


  // incompleteTodos: Todo[];


  constructor(
    private todoservice: TodoService,
    private logoutService: LogoutService,
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private eventservice: EventsService,
    private loadingController: LoadingController

    ) { }

    ngOnInit() {
      this.todos = this.todoservice.getTodos();

      this.eventservice.getEvents().pipe(
        map(events => events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      ).subscribe(res => {
        this.events = res;
      });
    }

    // async removeTheEvent(item: { id: string; }) {
    //   const loading = await this.loadingController.create({
    //     message: 'Deleting'
    //   });
    //   await loading.present();
    
    //   this.eventservice.removeEvent(item.id).then(() => {
    //     loading.dismiss();
    //   });
    // }


    // removeTheEvent(event: Event) {
    //   if (event && event.id) { // Check if todo object and id property are defined
    //     this.eventservice.removeEvent(event)
    //       .then(() => {
    //         console.log('Todo removed successfully');
    //         this.showToast('Note has been deleted! :)');
    //       })
    //       .catch((error) => {
    //         console.log('Error removing todo:', error);
    //         this.showToast('Error deleting note! :(');
    //       });
    //   } else {
    //     console.log('Invalid todo object:', event);
    //   }
    // }
    async removeTheEvent(event: Event) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure you want to delete this event?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              if (event && event.id) { 
                this.eventservice.removeEvent(event)
                  .then(() => {
                    console.log('Event removed successfully');
                    this.showToast('Event has been deleted! :)');
                  })
                  .catch((error) => {
                    console.log('Error removing event:', error);
                    this.showToast('Error deleting event! :(');
                  });
              } else {
                console.log('Invalid note object:', event);
              }
            }
          }
        ]
      });
      await alert.present();
    }
    

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params.tab === '5') {
        this.selectedSegment = 'tasks';
      }
    });
  }

  // remove(todo: Todo) {
  //   if (todo && todo.id) { // Check if todo object and id property are defined
  //     this.todoservice.removeTodo(todo)
  //       .then(() => {
  //         console.log('Todo removed successfully');
  //         this.showToast('Note has been deleted! :)');
  //       })
  //       .catch((error) => {
  //         console.log('Error removing todo:', error);
  //         this.showToast('Error deleting note! :(');
  //       });
  //   } else {
  //     console.log('Invalid todo object:', todo);
  //   }
  // }

  async remove(todo: Todo) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            if (todo && todo.id) { 
              this.todoservice.removeTodo(todo)
                .then(() => {
                  console.log('Note removed successfully');
                  this.showToast('Note has been deleted! :)');
                })
                .catch((error) => {
                  console.log('Error removing note:', error);
                  this.showToast('Error deleting note! :(');
                });
            } else {
              console.log('Invalid note object:', todo);
            }
          }
        }
      ]
    });
    await alert.present();
  }
  

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }
  isEventPast(eventDate: string) {
    const now = new Date();
    const date = new Date(eventDate);
    return date < now;
  }
}

 







  
// async presentAlert() {
//   const alert = await this.alertController.create({
//     header: 'Log Out',
//     message: 'Are you sure you want to logout?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Logout',
//         role: 'confirm',
//         handler: async () => {
//           await this.logoutService.logout();
//         }
//       }
//     ]
//   });

//   await alert.present();
// }


// function ViewChild(CalendarComponent: typeof CalendarComponent) {
//   throw new Error('Function not implemented.');
// }
  // ngOnInit() {
  //   this.todoservice.getTodos().subscribe(res => {
  //     this.todos = res;
  //   });
  // }


    // remove (todo) {
  //   this.todoservice.removeTodo(todo.id);
  // }
