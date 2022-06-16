import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksheetService {
  month;
  MonthNum;
  day;
  private dbpath='users'
  data:AngularFirestoreCollection<any>;

  public taskSheet=new Subject()

  constructor(private db:AngularFirestore) {
    this.data = db.collection(this.dbpath)
  }


  add(uid,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('task').add(newTask)
    // return this.data.doc(uid).collection('task').add(newTask)
  }

  updateTask(uid,id,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('task').doc(id).update(newTask)
  }

  deleteTask(uid,id,newTask){
    return this.data.doc(uid).collection('Year').doc(`${newTask.year}`).collection(`Month`).doc(`${newTask.month}`).collection('task').doc(id).delete()
  }

  getAllTask(uid,newTask){
    return this.data.doc(uid).collection("Year").doc(`${newTask.year}`).collection('Month').doc(`${newTask.month}`).collection('task').snapshotChanges().pipe(map(a=>
      a.map(c=>
        ({uid:c.payload.doc.id,...c.payload.doc.data()})  
      )  
    ))
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
  getMonths(month){
    switch(month){
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


  getMonthNum(month){
    switch(month){
      case 'Jan':
        this.MonthNum = 1;
        break;
      case 'Feb':
        this.MonthNum = 2;
        break;
      case 'Mar':
        this.MonthNum = 3;
        break;
      case 'Apr':
        this.MonthNum = 4;
        break;
      case 'May':
        this.MonthNum = 5;
        break;
      case 'Jun':
        this.MonthNum = 6;
        break;
      case 'Jul':
        this.MonthNum = 7;
        break;
      case 'Aug':
        this.MonthNum = 8;
        break;
      case 'Sep':
        this.MonthNum = 9;
        break;
      case 'Oct':
        this.MonthNum = 10;
        break;
      case 'Nov':
        this.MonthNum = 11;
        break;
      case 'Dec':
        this.MonthNum = 12;
    }
    return this.MonthNum
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
