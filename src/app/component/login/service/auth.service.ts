import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { User } from "../../../model/user";
import { UserloginActivityService } from "src/app/service/userlogin-activity.service";
import { UserService } from "src/app/service/user.service";
import { TasksheetService } from "src/app/service/tasksheet.service";


@Injectable({
    providedIn: 'root',
})

export class AuthService {

    startTime:any
    stopTime:any
    LocalTimeStart:any
    localTimeEnd:any
    localDate:any;

    userRef:AngularFirestoreCollection<any>
    adminRef:AngularFirestoreCollection<any>

    constructor(
        private afs:AngularFirestore,
        private afAuth:AngularFireAuth,
        private router:Router,
        private userloginActivityService:UserloginActivityService,
        private userService:UserService,
        private tasksheetService:TasksheetService
    ){
        this.userRef =this.afs.collection('users')
        this.adminRef = this.afs.collection('admin')
        this.afAuth.authState.subscribe((user)=>{
            if(user){
                localStorage.setItem('user',JSON.stringify(user))
                JSON.parse(localStorage.getItem('user')!)
            }else{
                localStorage.setItem('user','null')
                JSON.parse(localStorage.getItem('user'))
            }
        })


        this.startTime = JSON.parse(localStorage.getItem('startTime'))
        this.localDate = JSON.parse(localStorage.getItem('date'))
    }

    login(email:string,password:string){
        return this.afAuth.signInWithEmailAndPassword(email,password).then(result=>{
            if(result.user.uid === 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'){
                this.router.navigate(['/admin'])
                this.setAdminData(result.user)
            }else{
                this.router.navigate(['/user'])
                this.setUserData(result.user)
            }
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
        })
    }

    SignUp(email: string, password: string) {
        return this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            this.setUserData(result.user);
          })
          .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
          });
      }

      
    setAdminData(adminData:any){
        const adminRef:AngularFirestoreDocument<any>=this.afs.doc(`admin/${adminData.uid}`)

        const admin:User={
            uid:adminData.uid,
            email:adminData.email,
            Status:true,
        }
        return adminRef.set(admin,{
            merge:true
        })
    }

    forgotPassword(passwordResetEmail:string){
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(()=>{
            Swal.fire({
                icon:'success',
                title:'Successfully',
                text:'Password reset email sent,check your box'
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        })
    }

    get isLoggedIn():Boolean{
        const user=JSON.parse(localStorage.getItem('user')!);
        return user !== null  ? true :false
    }

    setUserData(user:any){
        const userData:User={
            uid:user.uid,
            email:user.email,
            Status:true,
        }
        this.LocalTimeStart= new Date().toLocaleTimeString()
        this.startTime = new Date().getTime()
        this.localDate =  new Date().toLocaleDateString()
        localStorage.setItem('LocalTimeStart',JSON.stringify(this.LocalTimeStart))
        localStorage.setItem('startTime',JSON.stringify(this.startTime))
        localStorage.setItem('date',JSON.stringify(this.localDate))

        return this.userRef.doc(user.uid).set(userData,{merge:true})
    }

    logout(uid){
        return this.afAuth.signOut().then(()=>{
            localStorage.removeItem('user')
            this.router.navigate(['login'])
            
            if(uid !==  'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'){
                this.userRef.doc(uid).update({Status:false})

                this.localTimeEnd = new Date().toLocaleTimeString()
                this.stopTime = new Date().getTime()
    
                let time = this.stopTime - this.startTime
                let timehrs =this.userloginActivityService.convertMsToHM(time)
                let date=new Date().getDate()
                let localDate =new Date().toLocaleDateString()
                let month = this.tasksheetService.getMonth()
                let year = new Date().getFullYear()
    
                this.userloginActivityService.add(uid,{
                    localDate:localDate,
                    startTime:this.LocalTimeStart,
                    endTime:this.localTimeEnd,
                    totalTime:time,
                    date:date,
                    month:month,
                    year:year,
                    totalHours:timehrs
                })
            }else{
                this.adminRef.doc(uid).update({Status:false})
            }

        })
    }

}