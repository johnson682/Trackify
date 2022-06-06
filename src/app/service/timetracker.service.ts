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

  getCurrentTimeInTaskStartEndFormat() {
    let current_datetime = new Date();
    let date = current_datetime.getDate();
    date = (date < 10) ? + "0" + date : date;
    let month = (current_datetime.getMonth() + 1);
    month = (month < 10) ? +"0" + month : month;
    let hours = current_datetime.getHours();
    hours = (hours < 10) ? +  "0"+hours : hours;
    let minutes = current_datetime.getMinutes();
    minutes = (minutes < 10) ? + "0"+minutes : minutes;
    let seconds = current_datetime.getSeconds();
    seconds = (seconds < 10) ? + "0"+seconds : seconds;
    let formatted_date = current_datetime.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return formatted_date;
  }
}