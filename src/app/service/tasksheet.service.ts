import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksheetService {
  month;
  day;
  private dbpath='users'
  data:AngularFirestoreCollection<any>;

  constructor(private db:AngularFirestore) {
    this.data = db.collection(this.dbpath)
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

  getAllTask(){
    return this.data
  }

  getMonth(){
    switch(new Date().getMonth()){
      case 0:
        this.month = "Jan";
        break;
      case 1:
        this.month = "Feb";
        break;
      case 2:
        this.month = "Mar";
        break;
      case 3:
        this.month = "Apr";
        break;
      case 4:
        this.month = "May";
        break;
      case 5:
        this.month = "Jun";
        break;
      case 6:
        this.month = "Jul";
        break;
      case 7:
        this.month = "Aug";
        break;
      case 8:
        this.month = "Sep";
        break;
      case 9:
        this.month = "Oct";
        break;
      case 10:
        this.month = "Nov";
        break;
      case 11:
        this.month = "Dec";
    }
    return this.month
  }

  getDay(){

    switch (new Date().getDay()) {
      case 0:
        this.day = "Sunday";
        break;
      case 1:
        this.day = "Monday";
        break;
      case 2:
        this.day = "Tuesday";
        break;
      case 3:
        this.day = "Wednesday";
        break;
      case 4:
        this.day = "Thursday";
        break;
      case 5:
        this.day = "Friday";
        break;
      case 6:
        this.day = "Saturday";
    }
    return this.day
  }
}
