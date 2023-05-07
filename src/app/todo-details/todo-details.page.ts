import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from '../services/todo.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';
// import { ToastService } from '../services/toast.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';


import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
const {Camera}  = Plugins;



@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {


  todo: Todo = {
    id: '',
    task: '',
    createdAt: new Date().getTime(),
    priority: null,
    imageURL: null,
    imageFilename: null,
    userId: '',
    completed: false,
    completedAt: new Date().getTime(),
  }

  // todoId = null;
  // saved = false;
  
  // showToast: any;

  capturedImage = null;
  updateImage = false;
  // activatedRoute: any;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController,
    private router: Router,
    private toastCtrl: ToastController
    // private toastService: ToastService,
    ) { }

  ngOnInit() {
    // this.todoId = this.route.snapshot.params['id'];
    // if (this.todoId) {
    //   this.loadTodo();
    // }
  }

  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id'); // Update this line
    console.log(id);
    if (id) {
      console.log(id);
      this.todoService.getTodo(id).subscribe(todo => {
        this.todo = todo;
        console.log("The URL is " + this.todo.imageURL);
        console.log("The Image fileName " + this.todo.imageFilename);
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
    this.todo.imageURL = image.base64String;
    this.updateImage = false;
  }

  // await this.todoService.getTodo(todo);
  // this.router.navigateByUrl('/details/' + todo.id);
  addTodo() {
    this.todoService.addTodo(this.todo).subscribe(() => {
      // this.router.navigateByUrl('/');
      this.showToast('Your note is added :)');
    }, err => {
      this.showToast('There was a problem adding your note :(');
    });
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo).subscribe(() => {
      this.showToast('Your note was saved :)');
    }, err => {
      this.showToast('There was a problem saving your note :(');
    });
  }

  
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  // async loadTodo() {
  //   const loading = await this.loadingController.create({
  //     message: 'Loading your notes...'
  //   });
  //   await loading.present();

  //     this.todoService.getTodo(this.todoId).subscribe (res => {
  //       loading.dismiss();
  //       this.todo = res;
  //     })
  // }


  // async saveTodo() {
  //   const loading = await this.loadingController.create({
  //     message: 'Saving your note'
  //   });
  //   await loading.present();
  
  //   if (this.todoId) {
  //     this.todoService.updateTodo(this.todo, this.todoId).subscribe(() => {
  //       loading.dismiss();
  //       this.saved = true;
  //       this.toastService.showToast("Your note has been saved :)");
  //     }, (err) => {
  //       this.toastService.showToast("There was a problem :(");
  //     });
  //   } else {
  //     this.todoService.addTodo(this.todo).subscribe(() => {
  //       loading.dismiss();
  //       this.saved = true;
  //     });
  //   }
  // }

}



 // updateTaskName(newTaskName: string) {
  //   this.todo.task = newTaskName;
  //   this.updateTodo();
  // }

  





//when i do this it works but, i lose the navbar and the tabs on tab5???!!!!
        // this.nav.navigateForward('tab5')
        // this.router.navigate(['/tab5']);

                // this.nav.navigateForward('tab5')
        // this.router.navigatebyURL(['/tab5']);





          // async saveTodo() {
  //   const loading = await this.loadingController.create({
  //     message: 'Saving your note'
  //   });
  //   await loading.present();

  //   if (this.todoId) {
  //     this.todoService.updateTodo(this.todo, this.todoId).then(() => {
  //       loading.dismiss();
  //       this.saved = true;
  //       this.toastService.showToast("Your note has been saved :)");
  //     }),err => {
  //       this.showToast("There was a problem :(");
  //     }
  //   } 
    
  //   else {
  //     this.todoService.addTodo(this.todo).then(() => {
  //       loading.dismiss();
  //       this.saved = true;
  //       // this.router.navigateByUrl('/tab5');
  //     })
  //   }
  // }