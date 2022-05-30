import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksheetService {

  private dbpath='users'
  data:AngularFirestoreCollection<any>;

  constructor(private db:AngularFirestore) {
    this.data = db.collection(this.dbpath)
  }

  getId(){
    return this.data
  }

  add(uid,newTask){
    return this.data.doc(uid).collection('task').add(newTask)
  }

  updateTask(uid,id,newTask){
    return this.data.doc(uid).collection('task').doc(id).update(newTask)
  }

  deleteTask(uid,id){
    return this.data.doc(uid).collection('task').doc(id).delete()
  }
}
