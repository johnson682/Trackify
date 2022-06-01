import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class TimeTrackerService{
    private dbpath='users'
  data:AngularFirestoreCollection<any>;

  constructor(private db:AngularFirestore) {
    this.data = db.collection(this.dbpath)
  }

  getId(){
    return this.data
  }

  add(uid,newTask){
    return this.data.doc(uid).collection('timetracker').add(newTask)
  }

  updateTask(uid,id,newTask){
    return this.data.doc(uid).collection('timetracker').doc(id).update(newTask)
  }

  deleteTask(uid,id){
    return this.data.doc(uid).collection('timetracker').doc(id).delete()
  }

  getAllTimeTracker(uid){
      return this.getId().doc(uid).collection('timetracker').snapshotChanges().pipe(
        map(a=>a.map(c=>
            ({id:c.payload.doc.id,...c.payload.doc.data()})    
        ))
      )
  }
}