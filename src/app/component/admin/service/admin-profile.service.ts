import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  dbPath='admin'
  adminRef:AngularFirestoreCollection<any>
  
  constructor(private db:AngularFirestore) {
    this.adminRef = this.db.collection(this.dbPath)
  }

  getAdminData(){
    return this.adminRef
  }

  updateAdminData(uid:any,newData:any){
    return this.adminRef.doc(uid).update(newData)
  }

  

}
