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

    
    add(senderUid,reciverUid,newMessage){
       this.sender(senderUid,reciverUid).add(newMessage)
       this.reciver(senderUid,reciverUid).add(newMessage)
    }

    addUserDetails(senderUid,reciverUid,newMessage){
        this.data.doc(senderUid).collection('Message').doc(reciverUid).update(newMessage)
    }

    getAllChatUser(senderUid){
        return this.data.doc(senderUid).collection('Message').valueChanges()
    }

    updateuserDetails(senderUid,reciverUid,newData){
        this.data.doc(reciverUid).collection('Message').doc(senderUid).update(newData)
    }


    delete(senderUid,reciverUid,msgId){
        this.sender(senderUid,reciverUid).doc(msgId.uid).delete()
        
        this.getAllReciverMessage(senderUid,reciverUid).subscribe(data=>{
            data.forEach(ele=>{
                if(ele["id"] == msgId.id){
                    this.reciver(senderUid,reciverUid).doc(ele.uid).delete()
                }
            })
        })

    }

    deleteAllMsg(senderUid,reciverUid){
        this.sender(senderUid,reciverUid).get().toPromise().then((quer)=>{
            quer.docs.forEach((doc)=>{
                doc.ref.delete()
            })
        })
    }

    
    getAllReciverMessage(senderUid,reciverUid){
        return this.reciver(senderUid,reciverUid).snapshotChanges().pipe(map(a=>a.map(c=>
            ({uid:c.payload.doc.id,...c.payload.doc.data()})
            )))
        }
        
    getAllSenderMessage(senderUid,reciverUid){
        return this.sender(senderUid,reciverUid) .snapshotChanges().pipe(map(a=>a.map(c=>
            ({uid:c.payload.doc.id,...c.payload.doc.data()})    
        )))
    }

    sender(senderUid,reciverUid){
        return this.data.doc(senderUid).collection('Message').doc(reciverUid).collection('newMessage')
    }
    reciver(senderUid,reciverUid){
        return this.data.doc(reciverUid).collection('Message').doc(senderUid).collection('newMessage')
    }
    
    getLastData(senderUid,reciverUid){
        return this.data.doc(senderUid).collection('Message').doc(reciverUid).collection('newMessage',ref =>ref.orderBy('sendingDate').limitToLast(1)).snapshotChanges().pipe(map(a=>a.map(c=>({uid:c.payload.doc.id,...c.payload.doc.data()}))))
    }

}