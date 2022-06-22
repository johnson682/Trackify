import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class MessageService{

    dbpath = 'users'
    data:AngularFirestoreCollection<any>;
    constructor(private db:AngularFirestore){
        this.data = db.collection(this.dbpath)
    }

    add(uid,id,newMessage){
        return this.data.doc(uid).collection('Message').doc(id).collection('newMessage').add(newMessage)
    }

    update(uid,id,newMessage){

    }


    getAllMessage(uid,id){
        return this.data.doc(uid).collection('Message').doc(id).collection('newMessage').snapshotChanges().pipe(map(a=>a.map(c=>
            ({uid:c.payload.doc.id,...c.payload.doc.data()})    
        )))
    }

    

}