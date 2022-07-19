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

    addReciverDetails(senderUid,reciverUid,newMessage){
        this.getData(senderUid).doc(reciverUid).set(newMessage,{merge:true})
    }
    
    addSenderDetail(senderUid,reciverUid,newMessage){
        this.getData(reciverUid).doc(senderUid).set(newMessage,{merge:true})
    }

    getAllChatUser(senderUid){
        return this.getData(senderUid).snapshotChanges()
        .pipe(
            map(a=>a.map(c=>
                ({uid:c.payload.doc.id,...c.payload.doc.data()})
            ))
        )
    }

    delete(senderUid,reciverUid,msgId){
        this.sender(senderUid,reciverUid).doc(msgId.uid).delete()
        
        this.reciver(senderUid,reciverUid).snapshotChanges()
        .pipe(map(a=>a.map(c=>
            ({uid:c.payload.doc.id,...c.payload.doc.data()})
        ))).subscribe(data=>{
            data.forEach(ele=>{
                if(ele["id"] == msgId.id){
                    this.reciver(senderUid,reciverUid).doc(ele.uid).delete()
                }
            })
        })

    }

    deleteAllMsg(senderUid,reciverUid){
        this.getData(senderUid).doc(reciverUid).delete()
        this.sender(senderUid,reciverUid).get().subscribe(data=>{
            data.docs.forEach(ele=>{
                ele.ref.delete()
            })
        })
    }

    updateMsg(senderUid,reciverUid,newData){
        return this.getData(senderUid).doc(reciverUid).update(newData)
    }
        
    getAllSenderMessage(senderUid,reciverUid){
        return this.sender(senderUid,reciverUid) .snapshotChanges().pipe(map(a=>a.map(c=>
            ({uid:c.payload.doc.id,...c.payload.doc.data()})    
        )))
    }

    getData(senderUid){
        return this.data.doc(senderUid).collection('Message')
    }

    sender(senderUid,reciverUid){
        return this.data.doc(senderUid).collection('Message').doc(reciverUid).collection('newMessage',ref=>ref.orderBy('sendingDate'))
    }
    reciver(senderUid,reciverUid){
        return this.data.doc(reciverUid).collection('Message').doc(senderUid).collection('newMessage',ref=>ref.orderBy('sendingDate'))
    }
    
    getLastData(senderUid,reciverUid){
        return this.data.doc(senderUid).collection('Message').doc(reciverUid)
        .collection('newMessage',ref =>ref.orderBy('sendingDate').limitToLast(1))
        .snapshotChanges().pipe(map(a=>a.map(c=>({uid:c.payload.doc.id,...c.payload.doc.data()}))))
    }

}