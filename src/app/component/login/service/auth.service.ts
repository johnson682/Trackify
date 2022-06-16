import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { User } from "../../../model/user";
import * as moment from "moment";


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


       
    }

    async login(email:string,password:string){
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            if (result.user.uid === 'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3') {
                this.router.navigate(['/admin']);
                this.setAdminData(result.user);
            } else {
                
                this.router.navigate(['/user']);
                this.setUserData(result.user);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    }

    SignUp(email: string, password: string , name:string) {
        return this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
            this.setUserDataToRegister(result.user,name);
          })
          .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
          });
      }

    setUserDataToRegister(user:any,name:any){
        const userData:any={
            uid:user.uid,
            email:user.email,
            name:name
        }
        return this.userRef.doc(user.uid).set(userData,{merge:true})
    }
      
    setAdminData(adminData:any){
        const adminRef:AngularFirestoreDocument<any>=this.afs.doc(`admin/${adminData.uid}`)

        const admin:User={
            uid:adminData.uid,
            email:adminData.email,
            Status:true,
            StopStatus:true,
            startTime:new Date().getTime(),
            localDate:moment().format('DD-MM-YYYY'),
            month:moment().format('MMM'),
            year:moment().format('YYYY'),
            date:moment().format('DD'),
            localTimeStart:moment().format('hh:mm a')
        }
        localStorage.setItem('user',JSON.stringify(admin))
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
            StopStatus:true,
            startTime:new Date().getTime(),
            localDate:moment().format('DD-MM-YYYY'),
            month:moment().format('MMM'),
            year:moment().format('YYYY'),
            date:moment().format('DD'),
            localTimeStart:moment().format('hh:mm a')
        }
        localStorage.setItem('user',JSON.stringify(userData))
        return this.userRef.doc(user.uid).set(userData,{merge:true})
    }

    logout(uid){
        return this.afAuth.signOut().then(()=>{
            localStorage.removeItem('user')
            this.router.navigate(['login'])
            if(uid !==  'zKHyZ0FyaAV4EnnMFrG3aeEeX8J3'){
                this.userRef.doc(uid).update({Status:false})
            }else{
                this.adminRef.doc(uid).update({Status:false})
            }

        })
    }

}