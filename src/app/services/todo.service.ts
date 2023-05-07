import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import {  of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
// import firebase from 'firebase/app';
import 'firebase/storage';


export interface Todo {
  id?: string;
  task: string;
  priority: number,
  createdAt: number,
  imageURL?: string,
  imageFilename: string,
  userId: string;
  completed: boolean;
  completedAt: number,
}

export interface User {
  uid:string,
  email: String
}



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Observable<Todo[]>; //observable with an array of to dos
  private todosCollection: AngularFirestoreCollection<Todo>; //the To do collection


  currentUser: User = null;


  constructor(
    private db: AngularFirestore, //afs used in lecture slides, db used here
    private storage: AngularFireStorage, 
    private afAuth: AngularFireAuth
    ) { 
    this.todosCollection = db.collection<Todo>('todos'); 

   
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();//...as Todo
          const id = a.payload.doc.id; //access the todo id of document
          return { id, ...data };
        });
      })
    );
    this.afAuth.authState.subscribe(user => {
      console.log("user changed:", user);
      this.currentUser = user;
    });
  }


getTodos(): Observable<Todo[]> {
  // Only return todos that belong to the current user, ordered by priority
  return this.todos.pipe(
    map(todos => {
      // Filter todos based on user ID
      const filteredTodos = todos.filter(todo => todo.userId === this.currentUser.uid);
      // Sort todos by priority from 1 to larger number
      return filteredTodos.sort((a, b) => a.priority - b.priority);
    })
  );
}

// getTodos(): Observable<Todo[]> {
//   // Only return todos that belong to the current user or don't have a userId, ordered by priority
//   return this.todos.pipe(
//     map(todos => {
//       // Filter todos based on user ID or if userId is null or undefined
//       const filteredTodos = todos.filter(todo => !todo.userId || todo.userId === this.currentUser.uid);
//       // Sort todos by priority from 1 to larger number, automatically
//       return filteredTodos.sort((a, b) => a.priority - b.priority);
//     })
//   );
// }


  //if you want to view one of the to dos and its details
  //we use the id which the object will have, it will generate automatically on firestore
  getTodo(id: string) {
    return this.todosCollection.doc<Todo>(id).valueChanges().pipe(
      take(1),
      map (todo => {
        todo.id = id;
        return todo;
      })
    )
  }

  // addTodo (todo: Todo) {
  //   let imageFilename = null; // Set to null initially
  //   let storageRef = null; // Set to null initially
  
  //   if (todo.imageURL) { // Check if imageURL is provided
  //     imageFilename = `${new Date().getTime()}Notes.png`;
  //     storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  //   }
  
  //   console.log("StorageRef" + storageRef);
  //   console.log("ImageFileName" + imageFilename);
  
  //   const storageObs = imageFilename ? from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })) : of(null); // Use ternary operator to conditionally create storageObs
  
  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       if (obj) {
  //         console.log("URL promise");
  //         // Use type assertion to cast obj to firebase.storage.UploadTaskSnapshot
  //         return (obj as firebase.storage.UploadTaskSnapshot).ref.getDownloadURL();
  //       } else {
  //         return of(null);
  //       }
  //     }),
  //     switchMap(url => {
  //       console.log("File is downloaded");
  //       if (url) {
  //         todo.imageURL = url as string; // Type assertion to cast url to string
  //         todo.imageFilename = imageFilename;
  //       } else {
  //         todo.imageURL = null;
  //         todo.imageFilename = null;
  //       }
  //       todo.userId = this.currentUser.uid; // Set the userId to the uid of the currently logged in user
  //       todo.id = this.todosCollection.ref.doc().id;
  //       return this.todosCollection.doc(todo.id).set(todo);
  //     })
  //   )
  // }


  addTodo (todo: Todo) {
    let imageFilename = null; // Set to null initially
    let storageRef = null; // Set to null initially
  
    if (todo.imageURL) { // Check if imageURL is provided
      imageFilename = `${new Date().getTime()}Notes.png`;
      storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
    }
  
    console.log("StorageRef" + storageRef);
    console.log("ImageFileName" + imageFilename);
  
    const storageObs = imageFilename ? from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })) : of(null); // Use ternary operator to conditionally create storageObs
  
    return storageObs.pipe(
      switchMap(obj => {
        if (obj) {
          console.log("URL promise");
          // Use type assertion to cast obj to firebase.storage.UploadTaskSnapshot
          return (obj as firebase.storage.UploadTaskSnapshot).ref.getDownloadURL();
        } else {
          return of(null);
        }
      }),
      switchMap(url => {
        console.log("File is downloaded");
        if (url) {
          todo.imageURL = url as string; // Type assertion to cast url to string
          todo.imageFilename = imageFilename;
        } else {
          todo.imageURL = null;
          todo.imageFilename = null;
        }
  
        // Set the userId to the uid of the currently logged in user, or a unique ID generated by Firebase's push() method
        todo.userId = this.currentUser ? this.currentUser.uid : this.todosCollection.ref.doc().id;
  
        todo.id = this.todosCollection.ref.doc().id;
        return this.todosCollection.doc(todo.id).set(todo);
      })
    )
  }

  
updateTodo(todo: Todo) {
  let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);

  if (todo.userId !== this.currentUser.uid) {
    return throwError("Unauthorized access"); // Throw an error if user is not authorized
  }

  return this.todosCollection.doc(todo.id).get().pipe(
    switchMap(doc => {
      const currentTodo = doc.data() as Todo;

      // Update task, priority, and when it was created
      currentTodo.task = todo.task;
      currentTodo.priority = todo.priority;
      currentTodo.createdAt = new Date().getTime();
      
      // Set completed property to the value of todo.completed
      currentTodo.completed = todo.completed;

      // Base64 change img to a string if imageURL is provided and different from current img
      if (todo.imageURL && todo.imageURL !== currentTodo.imageURL) {
        return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
          switchMap(snapshot => {
            if (currentTodo.imageFilename) {
              this.deleteFile(currentTodo.imageFilename);
            }
            return snapshot.ref.getDownloadURL();
          }),
          tap(downloadURL => {
            currentTodo.imageURL = downloadURL;
            currentTodo.imageFilename = imageFilename;
          }),
          switchMap(() => {
            return this.todosCollection.doc(todo.id).update(currentTodo);
          })
        );
      } else {
        return this.todosCollection.doc(todo.id).update(currentTodo);
      }
    })
  );
}


  removeTodo(todo: Todo): Promise<void> {
    if (todo.userId === this.currentUser.uid) {
      this.deleteFile(todo.imageFilename);
      return this.todosCollection.doc(todo.id).delete();
    } else {
      return Promise.reject('Todo does not belong to current user');
    }
  }

  deleteFile(fileName: string){
    let storageRef = firebase.storage().ref(`/todos/${fileName}`);
    storageRef.delete().then(() => {
      console.log("File deleted successfully");
    }).catch((error) => {
      console.log("Error: File NOT deleted");
    });
  }
}






//MY OLD WORKING CODE AND CRUD OPERATIONS BELOW IN CASE THINGS GO WRONG :)

//   updateTodo(todo: Todo) {
//     let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
//     let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);

//     if (todo.userId !== this.currentUser.uid) {
//         return throwError("Unauthorized access"); // Throw an error if user is not authorized
//     }

//     return this.todosCollection.doc(todo.id).get().pipe(
//         switchMap(doc => {
//             const currentTodo = doc.data() as Todo;

//             // update task, priority, and when it was created
//             currentTodo.task = todo.task;
//             currentTodo.priority = todo.priority;
//             currentTodo.createdAt = new Date().getTime();

//             // base64 change img to a string if imageURL is provided and different from current img
//             if (todo.imageURL && todo.imageURL !== currentTodo.imageURL) {
//                 return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
//                     switchMap(snapshot => {
//                         // use the deleteFile function
//                         if (currentTodo.imageFilename) {
//                             this.deleteFile(currentTodo.imageFilename);
//                         }
//                         return snapshot.ref.getDownloadURL();
//                     }),
//                     tap(downloadURL => {
//                         currentTodo.imageURL = downloadURL;
//                         currentTodo.imageFilename = imageFilename;
//                     }),
//                     switchMap(() => {
//                         return this.todosCollection.doc(todo.id).update(currentTodo);
//                     })
//                 );
//             } else {
//                 // If imageURL is not there or is same as current, update the todo document without uploading a new image
//                 return this.todosCollection.doc(todo.id).update(currentTodo);
//             }
//         })
//     );
// }

// updateTodo(todo: Todo) {
//   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
//   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);

//   if (todo.userId !== this.currentUser.uid) {
//       return throwError("Unauthorized access"); // Throw an error if user is not authorized
//   }

//   return this.todosCollection.doc(todo.id).get().pipe(
//       switchMap(doc => {
//           const currentTodo = doc.data() as Todo;

//           // update task, priority, and when it was created
//           currentTodo.task = todo.task;
//           currentTodo.priority = todo.priority;
//           currentTodo.createdAt = new Date().getTime();

//           // base64 change img to a string if imageURL is provided and different from current img
//           if (todo.imageURL && todo.imageURL !== currentTodo.imageURL) {
//               return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
//                   switchMap(snapshot => {
//                       // use the deleteFile function
//                       if (currentTodo.imageFilename) {
//                           this.deleteFile(currentTodo.imageFilename);
//                       }
//                       return snapshot.ref.getDownloadURL();
//                   }),
//                   tap(downloadURL => {
//                       currentTodo.imageURL = downloadURL;
//                       currentTodo.imageFilename = imageFilename;
//                   }),
//                   switchMap(() => {
//                       // If the completed property has been changed, update the todo document with the new value
//                       if (todo.completed !== currentTodo.completed) {
//                           currentTodo.completed = todo.completed;
//                       }
//                       return this.todosCollection.doc(todo.id).update(currentTodo);
//                   })
//               );
//           } else {
//               // If imageURL is not there or is same as current, update the todo document without uploading a new image
//               // If the completed property has been changed, update the todo document with the new value
//               if (todo.completed !== currentTodo.completed) {
//                   currentTodo.completed = todo.completed;
//               }
//               return this.todosCollection.doc(todo.id).update(currentTodo);
//           }
//       })
//   );
// }


  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   if (todo.userId !== this.currentUser.uid) {
  //     return throwError("Unauthorized access"); // Throw an error if user is not authorized
  //   }
  
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // only call deleteFile if imageURL is changed - from notes to notesUpdated
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       // new todo.task and todo.priority
  //       currentTodo.task = todo.task;
  //       currentTodo.priority = todo.priority;
  
  //       // base64 change img to a string
  //       if (todo.imageURL) {
  //         return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
  //           switchMap(snapshot => {
  //             return snapshot.ref.getDownloadURL();
  //           }),
  //           tap(downloadURL => {
  //             currentTodo.imageURL = downloadURL;
  //             currentTodo.imageFilename = imageFilename;
  //           }),
  //           switchMap(() => {
  //             return this.todosCollection.doc(todo.id).update(currentTodo);
  //           })
  //         );
  //       } else {
  //         return this.todosCollection.doc(todo.id).update(currentTodo);
  //       }
  //     })
  //   );
  // }
    // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   if (todo.userId !== this.currentUser.uid) {
  //     return throwError("Unauthorized access"); // Throw an error if user is not authorized
  //   }
  
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // only call deleteFile if imageURL is changed - from notes to notesUpdated
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       // new todo.task and todo.priority
  //       currentTodo.task = todo.task;
  //       currentTodo.priority = todo.priority;
  
  //       // base64 change img to a string
  //       if (todo.imageURL) {
  //         return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
  //           switchMap(snapshot => {
  //             return snapshot.ref.getDownloadURL();
  //           }),
  //           tap(downloadURL => {
  //             currentTodo.imageURL = downloadURL;
  //             currentTodo.imageFilename = imageFilename;
  //           }),
  //           switchMap(() => {
  //             return this.todosCollection.doc(todo.id).update(currentTodo);
  //           })
  //         );
  //       } else {
  //         return this.todosCollection.doc(todo.id).update(currentTodo);
  //       }
  //     })
  //   );
  // }
  

//   getTodos(): Observable<Todo[]> {
//     return this.todos;
// }

  // removeTodo(todo: Todo): Promise<void> {
  //   this.deleteFile(todo.imageFilename);
  //   return this.todosCollection.doc(todo.id).delete();
  // }


    // addTodo (todo: Todo) {
  //   let imageFilename = null; // Set to null initially
  //   let storageRef = null; // Set to null initially
  
  //   if (todo.imageURL) { // Check if imageURL is provided
  //     imageFilename = `${new Date().getTime()}Notes.png`;
  //     storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  //   }
  
  //   console.log("StorageRef" + storageRef);
  //   console.log("ImageFileName" + imageFilename);
  
  //   const storageObs = imageFilename ? from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })) : of(null); // Use ternary operator to conditionally create storageObs
  
  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       if (obj) {
  //         console.log("URL promise");
  //         // Use type assertion to cast obj to firebase.storage.UploadTaskSnapshot
  //         return (obj as firebase.storage.UploadTaskSnapshot).ref.getDownloadURL();
  //       } else {
  //         return of(null);
  //       }
  //     }),
  //     switchMap(url => {
  //       console.log("File is downloaded");
  //       if (url) {
  //         todo.imageURL = url as string; // Type assertion to cast url to string
  //         todo.imageFilename = imageFilename;
  //       } else {
  //         todo.imageURL = null;
  //         todo.imageFilename = null;
  //       }
  //       todo.id = this.todosCollection.ref.doc().id;
  //       return this.todosCollection.doc(todo.id).set(todo);
  //     })
  //   )
  // }

  // getTodos(): Observable<Todo[]> {
//   // Only return todos that belong to the current user
//   return this.todos.pipe(
//     map(todos => {
//       // Filter todos based on user ID
//       return todos.filter(todo => todo.userId === this.currentUser.uid);
//     })
//   );
// }




  //adds a new to do
  // addTodo (todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}Notes.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);

  //   console.log("StorageRef" + storageRef);
  //   console.log("ImageFileName" + imageFilename);

  //   const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })); //converting to a Base64 string

  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       console.log("URL promise");
  //       return obj.ref.getDownloadURL();
  //     }),
  //     switchMap(url => {
  //       console.log("File is downloaded");
  //       todo.imageURL = url;
  //       todo.imageFilename = imageFilename;
  //       // return this.todosCollection.add(todo);
  //       todo.id = this.todosCollection.ref.doc().id;
  //       return this.todosCollection.doc(todo.id).set(todo);
  //     })
  //   )
  // }



  //removes a to do
  // removeTodo (id: string) {
  //   this.deleteFile(todo.imageFilename);
  //   return this.todosCollection.doc(id).delete();
  // }


  //returns our observable array with todos
  // getTodos() {
  //   return this.todos;
  // }
  


  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   // Get the current todo from Firestore to compare with the updated todo
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // Check if imageURL has changed before calling deleteFile
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       // Update todo with new task and priority values
  //       currentTodo.task = todo.task; // Assign the new value of todo.task
  //       currentTodo.priority = todo.priority; // Assign the new value of todo.priority
  
  //       // Call the update method to update the Firestore document with the new values
  //       return this.todosCollection.doc(todo.id).update(currentTodo);
  //     })
  //   );
  // }







  // imageURL: string,
  // imageFilename: string,
  // createdBy: string,
    // createdAt?: firebase.firestore.FieldValue;




  //will update the to do object
  // todo: Todo, id: string
  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  //   console.log("StorageRef" + storageRef);
  //   console.log("ImageFileName" + imageFilename);

  //   this.deleteFile(todo.imageFilename);
  //   const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })); //converting to a Base64 string

  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       console.log("URL promise");
  //       return obj.ref.getDownloadURL();
  //     }),
  //     switchMap(url => {
  //       console.log("File is downloaded");
  //       todo.imageURL = url;
  //       todo.imageFilename = imageFilename;
  //       return this.todosCollection.doc(todo.id).update(todo);
  //     })
  //   )
  // }





  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  //   console.log("StorageRef" + storageRef);
  //   console.log("ImageFileName" + imageFilename);
  
  //   this.deleteFile(todo.imageFilename);
  //   const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' })); //converting to a Base64 string
  
  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       console.log("URL promise");
  //       return obj.ref.getDownloadURL();
  //     }),
  //     switchMap(url => {
  //       console.log("File is downloaded");
  //       todo.imageURL = url;
  //       todo.imageFilename = imageFilename;
  //       return this.todosCollection.doc(todo.id).update(todo);
  //     })
  //   )
  // }

  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  //   this.deleteFile(todo.imageFilename);
  //   const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' }));

  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       console.log("Got File Download URL Promise");
  //       return obj.ref.getDownloadURL();
  //     }),
  //     switchMap(url => {
  //       console.log("Got File Download URL");
  //       todo.imageURL = url;
  //       todo.createdAt = new Date().getTime(),
  //       todo.imageFilename = imageFilename;
  //       return this.todosCollection.doc(todo.id).update(todo);
  //     })
  //   )
  // }

  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   // Get the current todo from Firestore to compare with the updated todo
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // Check if imageURL has changed before calling deleteFile
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' }));
  
  //       return storageObs.pipe(
  //         switchMap(obj => {
  //           console.log("Got File Download URL Promise");
  //           return obj.ref.getDownloadURL();
  //         }),
  //         switchMap(url => {
  //           console.log("Got File Download URL");
  //           todo.imageURL = url;
  //           todo.createdAt = new Date().getTime();
  //           todo.imageFilename = imageFilename;
  
  //           return this.todosCollection.doc(todo.id).update(todo);
  //         })
  //       )
  //     })
  //   );
  // }
  
  
  
  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   // Get the current todo from Firestore to compare with the updated todo
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // Check if imageURL has changed before calling deleteFile
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       } else {
  //         // If imageURL has not changed, manually trigger the next() method to proceed to the next switchMap
  //         return of(null);
  //       }
  
  //       const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' }));
  
  //       return storageObs.pipe(
  //         switchMap(obj => {
  //           console.log("Got File Download URL Promise");
  //           return obj.ref.getDownloadURL();
  //         }),
  //         switchMap(url => {
  //           console.log("Got File Download URL");
  //           todo.imageURL = url;
  //           todo.createdAt = new Date().getTime();
  //           todo.imageFilename = imageFilename;
  
  //           return this.todosCollection.doc(todo.id).update(todo);
  //         })
  //       )
  //     })
  //   );
  // }
  
  
  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   // Get the current todo from Firestore to compare with the updated todo
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // Check if imageURL has changed before calling deleteFile
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' }));
  
  //       return storageObs.pipe(
  //         switchMap(obj => {
  //           console.log("Got File Download URL Promise");
  //           return obj.ref.getDownloadURL();
  //         }),
  //         switchMap(url => {
  //           console.log("Got File Download URL");
  //           todo.imageURL = url;
  //           todo.createdAt = new Date().getTime();
  //           todo.imageFilename = imageFilename;
            
  //           // Update todo.task and todo.priority with their current values
  //           todo.task = todo.task; // Assigning the same value to trigger Firestore update
  //           todo.priority = todo.priority; // Assigning the same value to trigger Firestore update
  
  //           return this.todosCollection.doc(todo.id).update(todo);
  //         })
  //       )
  //     })
  //   );
  // }
  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  
  //   // Get the current todo from Firestore to compare with the updated todo
  //   return this.todosCollection.doc(todo.id).get().pipe(
  //     switchMap(doc => {
  //       const currentTodo = doc.data() as Todo;
  
  //       // Check if imageURL has changed before calling deleteFile
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       } else {
  //         // If imageURL has not changed, manually trigger the next() method to proceed to the next switchMap
  //         return of(null);
  //       }
  
  //       const storageObs = from(storageRef.putString(todo.imageURL, "base64", { contentType: 'image/png' }));
  
  //       return storageObs.pipe(
  //         switchMap(obj => {
  //           console.log("Got File Download URL Promise");
  //           return obj.ref.getDownloadURL();
  //         }),
  //         switchMap(url => {
  //           console.log("Got File Download URL");
  //           todo.imageURL = url;
  //           todo.createdAt = new Date().getTime();
  //           todo.imageFilename = imageFilename;
  
  //           // Update todo with new task and priority values
  //           todo.task = todo.task; // Assign the new value of todo.task
  //           todo.priority = todo.priority; // Assign the new value of todo.priority
  
  //           // Call the update method to update the Firestore document with the new values
  //           return this.todosCollection.doc(todo.id).update(todo);
  //         })
  //       )
  //     })
  //   );
  // }
  







    
  // updateTodo(todo: Todo) {
  //   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
  //   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);
  

  // if (todo.userId !== this.currentUser.uid) {
  //   return throwError("Unauthorized access"); // Throw an error if user is not authorized
  // }
  // return this.todosCollection.doc(todo.id).get().pipe(
  //   switchMap(doc => {
  //     const currentTodo = doc.data() as Todo;

  //       // only call deleteFile if imageURL is changed - from notes to notesUpdateed
  //       if (todo.imageURL !== currentTodo.imageURL) {
  //         this.deleteFile(currentTodo.imageFilename);
  //       }
  
  //       // new todo.task and todo.priority
  //       currentTodo.task = todo.task; 
  //       currentTodo.priority = todo.priority; 
  
  //       // base64 change img to a string
  //       if (todo.imageURL) {
  //         return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' }))
  //           .pipe(
  //             switchMap(snapshot => {
  //               return snapshot.ref.getDownloadURL();
  //             }),
  //             tap(downloadURL => {
  //               currentTodo.imageURL = downloadURL;
  //               currentTodo.imageFilename = imageFilename;
  //             }),
  //             switchMap(() => {
  //               return this.todosCollection.doc(todo.id).update(currentTodo);
  //             })
  //           );
  //       } else {
  //         return this.todosCollection.doc(todo.id).update(currentTodo);
  //       }
  //     })
  //   );
  // }






// updateTodo(todo: Todo) {
//   let imageFilename = `${new Date().getTime()}NotesUpdated.png`;
//   let storageRef = firebase.storage().ref(`/todos/${imageFilename}`);

//   if (todo.userId !== this.currentUser.uid) {
//     return throwError("Unauthorized access"); // Throw an error if user is not authorized
//   }

//   return this.todosCollection.doc(todo.id).get().pipe(
//     switchMap(doc => {
//       const currentTodo = doc.data() as Todo;

//       // Update task, priority, and when it was created
//       currentTodo.task = todo.task;
//       currentTodo.priority = todo.priority;
//       currentTodo.createdAt = new Date().getTime();
//       currentTodo.completed = todo.completed;

//       // Base64 change img to a string if imageURL is provided and different from current img
//       if (todo.imageURL && todo.imageURL !== currentTodo.imageURL) {
//         return from(storageRef.putString(todo.imageURL, 'base64', { contentType: 'image/png' })).pipe(
//           switchMap(snapshot => {
//             // Use the deleteFile function
//             if (currentTodo.imageFilename) {
//               this.deleteFile(currentTodo.imageFilename);
//             }
//             return snapshot.ref.getDownloadURL();
//           }),
//           tap(downloadURL => {
//             currentTodo.imageURL = downloadURL;
//             currentTodo.imageFilename = imageFilename;
//           }),
//           switchMap(() => {
//             // the competed property
//             if (todo.completed !== undefined && todo.completed !== currentTodo.completed) {
//               currentTodo.completed = todo.completed;
//             }
//             return this.todosCollection.doc(todo.id).update(currentTodo);
//           })
//         );
//       } else {
//         // If imageURL is not there or is same as current, update the todo document without uploading a new image
//         // Update the completed property if it has been changed
//         if (todo.completed !== undefined && todo.completed !== currentTodo.completed) {
//           currentTodo.completed = todo.completed;
//         }
//         return this.todosCollection.doc(todo.id).update(currentTodo);
//       }
//     })
//   );
// }