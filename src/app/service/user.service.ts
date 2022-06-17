import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root',
})

export class UserService {


    private employeePath = 'users'
    userRef:AngularFirestoreCollection<any>

    constructor(private db: AngularFirestore,private afauth:AngularFireAuth,private router:Router) { 
        this.userRef = db.collection(this.employeePath)
    }
    getData(uid){
        return this.userRef.doc(uid).valueChanges()
    }

    updateUserData(uid:any,newData:any){
        this.userRef.doc(uid).update(newData)
    }

    removeEmployee(uid){
        this.userRef.doc(uid).delete()
        this.userRef.doc(`${uid}/year`).delete()
    }

    async removeAccount(uid){
        this.userRef.doc(uid).delete()
        this.userRef.doc(`${uid}/year`).delete()
        this.router.navigate(['/login']);
        (await this.afauth.currentUser).delete()
    }

} 