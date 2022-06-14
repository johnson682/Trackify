import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginActivityService {
  private dbpath = 'users'
  data:AngularFirestoreCollection<any>;

  constructor(private db:AngularFirestore) {
    this.data= this.db.collection(this.dbpath)
  }

  getData(uid,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('ActivityLog').snapshotChanges().pipe(
      map(a=>a.map(c=>
          ({uid:c.payload.doc.id,...c.payload.doc.data()})    
      ))
    )
  }

  add(uid,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('ActivityLog').add(newTask)
  }
  update(uid,id,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('ActivityLog').doc(id).update(newTask)
  }

  delete(uid,id,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('ActivityLog').doc(id).delete()
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
  }

  
}
