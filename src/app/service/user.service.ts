import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root',
})

export class UserService {

    users:Observable<any[]>;


    constructor(private db: AngularFirestore) { 
        this.users = db.collection('users').valueChanges()
        console.log(this.users);

         
    }

    updateUserData(uid:any,newData:any){
        console.log(newData);
        
        const update = this.db.collection('users')
        update.doc(uid).update(newData)
    }

}   