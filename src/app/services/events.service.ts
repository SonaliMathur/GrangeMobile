import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {  of, throwError } from 'rxjs';
// import firebase from 'firebase/app';
import 'firebase/storage';
import { tap } from 'rxjs/operators';


export interface Event {
  id?: string;
  name: string,
  date: string,
  description: string,
  userId: string;
  imageURL?: string,
  imageFilename: string,
}

export interface User {
  uid:string,
  email: String
}


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  // currentUser: User = null;
  private eventsCollection: AngularFirestoreCollection<Event>; 
  private events: Observable<Event[]>;

    currentUser: User = null;

  constructor(
    private db: AngularFirestore, //afs used in lecture slides, db used here
    private storage: AngularFireStorage, 
    private afAuth: AngularFireAuth,

  ) { 
    this.eventsCollection = db.collection<Event>('events');

    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();//...as event
          const id = a.payload.doc.id; //access the event id of document
          return { id, ...data };
        });
      })
    );
    this.afAuth.authState.subscribe(user => {
      console.log("user changed:", user);
      this.currentUser = user;
    });
  }


  // getEvents() {
  //   return this.events;
  // }

  getEvents(): Observable<Event[]> {
    return this.events.pipe(
      map(events => {
        return events.filter(event => event.userId === this.currentUser.uid);
      })
    );
  }

  // getEvent(id: string) {
  //   return this.eventsCollection.doc<Event>(id).valueChanges();
  // }

  getEvent(id: string) {
    return this.eventsCollection.doc<Event>(id).valueChanges().pipe(
      take(1),
      map (event => {
        event.id = id;
        return event;
      })
    )
  }


  // updateEvent(event: Event, id: string) {
  //   return this.eventsCollection.doc(id).update(event);
  // }

  updateEvent(event: Event) {
    let imageFilename = `${new Date().getTime()}EventsImageUpdated.png`;
    let storageRef = firebase.storage().ref(`/events/${imageFilename}`);
  
    if (event.userId !== this.currentUser.uid) {
      return throwError("Unauthorized access"); // Throw an error if user is not authorized
    }
  
    return this.eventsCollection.doc(event.id).get().pipe(
      switchMap(doc => {
        const currentEvent = doc.data() as Event;
  
        // Update task, priority, and when it was created
        currentEvent.name = event.name;
        currentEvent.description = event.description;
        currentEvent.date = event.date;
        
  
        // Base64 change img to a string if imageURL is provided and different from current img
        if (event.imageURL && event.imageURL !== currentEvent.imageURL) {
          return from(storageRef.putString(event.imageURL, 'base64', { contentType: 'image/png' })).pipe(
            switchMap(snapshot => {
              if (currentEvent.imageFilename) {
                this.deleteFile(currentEvent.imageFilename);
              }
              return snapshot.ref.getDownloadURL();
            }),
            tap(downloadURL => {
              currentEvent.imageURL = downloadURL;
              currentEvent.imageFilename = imageFilename;
            }),
            switchMap(() => {
              return this.eventsCollection.doc(event.id).update(currentEvent);
            })
          );
        } else {
          return this.eventsCollection.doc(event.id).update(currentEvent);
        }
      })
    );
  }

  // addEvent (event: Event) {
  //   return this.eventsCollection.add(event);
  // }

    addEvent (event: Event) {
    let imageFilename = null; // Set to null initially
    let storageRef = null; // Set to null initially
  
    if (event.imageURL) { // Check if imageURL is provided
      imageFilename = `${new Date().getTime()}EventImage.png`;
      storageRef = firebase.storage().ref(`/events/${imageFilename}`);
    }
  
    console.log("StorageRef" + storageRef);
    console.log("ImageFileName" + imageFilename);
  
    const storageObs = imageFilename ? from(storageRef.putString(event.imageURL, "base64", { contentType: 'image/png' })) : of(null); // Use ternary operator to conditionally create storageObs
  
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
          event.imageURL = url as string; // Type assertion to cast url to string
          event.imageFilename = imageFilename;
        } else {
          event.imageURL = null;
          event.imageFilename = null;
        }
        event.userId = this.currentUser.uid; // Set the userId to the uid of the currently logged in user
        event.id = this.eventsCollection.ref.doc().id;
        return this.eventsCollection.doc(event.id).set(event);
      })
    )
  }

  // removeEvent(id: string) {
  //   return this.eventsCollection.doc(id).delete();
  // }

  removeEvent(event: Event): Promise<void> {
    if (event.userId === this.currentUser.uid) {
      this.deleteFile(event.imageFilename);
      return this.eventsCollection.doc(event.id).delete();
    } else {
      return Promise.reject('Event does not belong to current user');
    }
  }

  deleteFile(fileName: string){
    let storageRef = firebase.storage().ref(`/events/${fileName}`);
    storageRef.delete().then(() => {
      console.log("File deleted successfully");
    }).catch((error) => {
      console.log("Error: File NOT deleted");
    });
  }

  }




