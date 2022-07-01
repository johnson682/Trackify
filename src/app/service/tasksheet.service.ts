import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TasksheetService {
  private dbpath='users'
  data:AngularFirestoreCollection<any>;

  constructor(private db:AngularFirestore,private http:HttpClient) {
    this.data = db.collection(this.dbpath)
  }

  add(uid,newTask,collectionName){
    return this.fromFireBase(uid,newTask.month,newTask.year,collectionName).add(newTask)
  }

  updateTask(uid,id,newTask,collectionName){
    return this.fromFireBase(uid,newTask.month,newTask.year,collectionName).doc(id).update(newTask)
  }

  deleteTask(uid,id,newTask,collectionName){
    return this.fromFireBase(uid,newTask.month,newTask.year,collectionName).doc(id).delete()
  }

  getAllTask(uid,newTask,collectionName){
    return this.fromFireBase(uid,newTask.month,newTask.year,collectionName).snapshotChanges().pipe(map(a=>
      a.map(c=>
        ({uid:c.payload.doc.id,...c.payload.doc.data()})  
      )  
    ))
  }

  fromFireBase(uid,month,year,varName){
    return this.data.doc(uid).collection('Year').doc(`${year}`).collection(`Month`).doc(`${month}`).collection(varName)
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

  sendMessage(body){
    return this.http.post('http://localhost:9000/sendmail',body)
  }

}
