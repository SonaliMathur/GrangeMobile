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
import 'firebase/storage';
import { tap } from 'rxjs/operators';


export interface PublicEvent {
  id?: string;
  name: string;
  date: string;
  description: string;
  createdAt: string,
  imageURL?: string,
  imageFilename: string,
}

@Injectable({
  providedIn: 'root'
})
export class PublicEventsService {

  private publicEventsCollection: AngularFirestoreCollection<PublicEvent>; 
  private publicEvents: Observable<PublicEvent[]>;

  constructor(
   private db: AngularFirestore,
   private storage: AngularFireStorage, 
   private afAuth: AngularFireAuth,
  ) { 

    this.publicEventsCollection = db.collection<PublicEvent>('publicEvents');

    this.publicEvents = this.publicEventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();//...as event
          const id = a.payload.doc.id; //access the event id of document
          return { id, ...data };
        });
      })
    );
  }


  getPublicEvents(): Observable<PublicEvent[]>{
    return this.publicEvents;
  }

  getPublicEvent(id: string) {
    return this.publicEventsCollection.doc<PublicEvent>(id).valueChanges().pipe(
      take(1),
      map (publicEvent => {
        publicEvent.id = id;
        return publicEvent;
      })
    )
  }

  updatePublicEvent(publicEvent: PublicEvent) {
    let imageFilename = `${new Date().getTime()}PublicEventsImageUpdated.png`;
    let storageRef = firebase.storage().ref(`/publicEvents/${imageFilename}`);
  
  
    return this.publicEventsCollection.doc(publicEvent.id).get().pipe(
      switchMap(doc => {
        const currentPublicEvent = doc.data() as PublicEvent;
  
        // Update name, description, date, and createdAt
        currentPublicEvent.name = publicEvent.name;
        currentPublicEvent.description = publicEvent.description;
        currentPublicEvent.date = publicEvent.date;
        currentPublicEvent.createdAt = publicEvent.createdAt;
        
  
        // Base64 change img to a string if imageURL is provided and different from current img
        if (publicEvent.imageURL && publicEvent.imageURL !== currentPublicEvent.imageURL) {
          return from(storageRef.putString(publicEvent.imageURL, 'base64', { contentType: 'image/png' })).pipe(
            switchMap(snapshot => {
              if (currentPublicEvent.imageFilename) {
                this.deleteFile(currentPublicEvent.imageFilename);
              }
              return snapshot.ref.getDownloadURL();
            }),
            tap(downloadURL => {
              currentPublicEvent.imageURL = downloadURL;
              currentPublicEvent.imageFilename = imageFilename;
            }),
            switchMap(() => {
              return this.publicEventsCollection.doc(publicEvent.id).update(currentPublicEvent);
            })
          );
        } else {
          return this.publicEventsCollection.doc(publicEvent.id).update(currentPublicEvent);
        }
      })
    );
  }


  addPublicEvent(publicEvent: PublicEvent) {
    let imageFilename = null; // Set to null initially
    let storageRef = null; // Set to null initially

    if (publicEvent.imageURL) { // Check if imageURL is provided
      imageFilename = `${new Date().getTime()}PublicEventsImage.png`;
      storageRef = firebase.storage().ref(`/publicEvents/${imageFilename}`);
    }

    console.log("StorageRef" + storageRef);
    console.log("ImageFileName" + imageFilename);

    const storageObs = imageFilename ? from(storageRef.putString(publicEvent.imageURL, "base64", { contentType: 'image/png' })) : of(null); // Use ternary operator to conditionally create storageObs

    return storageObs.pipe(
      switchMap(obj => {
        if (obj) {
          console.log("URL promise");
          return (obj as firebase.storage.UploadTaskSnapshot).ref.getDownloadURL();
        } else {
          return of(null);
        }
      }),
      switchMap(url => {
        console.log("File is downloaded");
        if (url) {
          publicEvent.imageURL = url as string; // Type assertion to cast url to string
          publicEvent.imageFilename = imageFilename;
        } else {
          publicEvent.imageURL = null;
          publicEvent.imageFilename = null;
        }
        // return from(this.publicEventsCollection.add(publicEvent)); // Use the add method to save publicEvent to Firestore
        publicEvent.id = this.publicEventsCollection.ref.doc().id;
        return this.publicEventsCollection.doc(publicEvent.id).set(publicEvent);
      })
    );
  }

  

  
  removePublicEvent(publicEvent: PublicEvent): Promise<void> {
    // Delete the image file from Firebase Storage
    if (publicEvent.imageFilename) {
      this.deleteFile(publicEvent.imageFilename);
    }
    
    // Remove the public event document from Firestore
    return this.publicEventsCollection.doc(publicEvent.id).delete();
  }
  
  deleteFile(fileName: string) {
    const storageRef = firebase.storage().ref(`/publicEvents/${fileName}`);
    return storageRef.delete().then(() => {
      console.log("File deleted successfully");
    }).catch((error) => {
      console.log("Error: File NOT deleted");
    });
  }
  
}
