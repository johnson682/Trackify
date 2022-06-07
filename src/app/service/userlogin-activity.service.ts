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

  getData(uid){
    return this.data.doc(uid).collection('ActivityLog').snapshotChanges().pipe(
      map(a=>a.map(c=>
          ({uid:c.payload.doc.id,...c.payload.doc.data()})    
      ))
    )
  }

  add(uid,newDate){
    return this.data.doc(uid).collection('ActivityLog').add(newDate)
  }
  update(uid,id,newTask){
    return this.data.doc(uid).collection('ActivityLog').doc(id).update(newTask)
  }

  delete(uid,id){
    return this.data.doc(uid).collection('ActivityLog').doc(id).delete()
  }
}
