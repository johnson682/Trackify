import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import * as moment from "moment";
import { finalize, map, Observable, pipe } from "rxjs";
import { FileUpload } from "../model/fileUpload";
import { EncryptDecryptService } from "./encrypt&Decrypt.service";
import { MessageService } from "./message.service";

@Injectable({
    providedIn:'root'
})

export class FileUploadService{
    private path ='users'
    data:AngularFirestoreCollection<any>
    constructor(private db:AngularFirestore,private storage:AngularFireStorage,private message:MessageService,private encrDecrService:EncryptDecryptService){
        this.data = this.db.collection(this.path)
    }

    pushFileStorage(fileUpload:FileUpload,senderUid,reciverUid):Observable<number>{
        const filePath = `${this.path}/${senderUid}/${reciverUid}/${fileUpload.file.name}`;
        const storageRef=this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath,fileUpload.file)

        uploadTask.snapshotChanges().pipe(
            finalize(()=>{
                storageRef.getDownloadURL().subscribe(downloadURL=>{
                    fileUpload.url = downloadURL
                    fileUpload.name = fileUpload.file.name
                    this.saveFileData(fileUpload,senderUid,reciverUid)
                })
            })
        ).subscribe()
        return uploadTask.percentageChanges()
    }

    saveFileData(fileUpload:FileUpload,senderUid,reciverUid) {
        let nums = new Date().getDate()*Math.floor(Math.random()*100000000000000000000)

        const message=this.encrDecrService.set("messages",fileUpload.name)
        
        let obj = {
            message:message,
            url:fileUpload.url,
            id :nums,
            sendingDate:moment().format('MMM-DD | hh:mm:ss a'),
            sendingTime:+new Date(),
            sendingSingleDate:new Date().getDate(),
            senderUid:senderUid,
            status:'Sending',
            urlStatus:true,
        }
        return this.message.add(senderUid,reciverUid,obj);
    }

    deleteFile(fileUpload,senderUid,reciverUid): void {
        const storageRef = this.storage.ref(`${this.path}/${senderUid}/${reciverUid}`);
        storageRef.child(fileUpload).delete();
    }

}