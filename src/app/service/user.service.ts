import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root',
})

export class UserService {

    users:Observable<any[]>;
    employeePath = 'users'
    userRef:AngularFirestoreCollection<any>

    constructor(private db: AngularFirestore,private afauth:AngularFireAuth) { 
        this.userRef = this.db.collection(this.employeePath)
        this.users = db.collection('users').valueChanges()
        console.log(this.users);

         
    }

    updateUserData(uid:any,newData:any){
        console.log(newData);
        return this.userRef.doc(uid).update(newData)
    }

    removeEmployee(uid,email,password){
        this.userRef.doc(uid).delete()
        this.userRef.doc(uid).collection('task').get().subscribe(data=>{
            console.log(data);
            data.forEach(a=>{
                a.ref.delete()
            })
        })
      }

} 