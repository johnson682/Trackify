import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root',
})

export class UserService {


    private employeePath = 'users'
    userRef:AngularFirestoreCollection<any>

    constructor(private db: AngularFirestore,private afauth:AngularFireAuth) { 
        this.userRef = db.collection(this.employeePath)
    }

    getData(){
        return this.userRef
    }

    updateUserData(uid:any,newData:any){
        console.log(newData);
        
        this.userRef.doc(uid).update(newData)
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