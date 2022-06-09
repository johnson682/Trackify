import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { User } from "../../../model/user";
import { UserloginActivityService } from "src/app/service/userlogin-activity.service";
import { TasksheetService } from "src/app/service/tasksheet.service";


@Injectable({
    providedIn: 'root',
})

export class AuthService {
    userRef:AngularFirestoreCollection<any>
    constructor(
        private afs:AngularFirestore,
        private afAuth:AngularFireAuth,
        private router:Router
    ){
        this.userRef =this.afs.collection('users')
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
            email:user.email
        }
        // const timeMangement:any={
        //     LoginTime:new Date().toLocaleTimeString(),
        //     LoginDate:new Date().toLocaleDateString(),
        //     startTimeInMS:new Date().getTime(),
        //     month:this.tasksheetService.getMonth(),
        //     year:new Date().getFullYear()
        // }
        // this.userLoginActivity.add(user.uid,timeMangement)
        return this.userRef.doc(user.uid).set(userData,{merge:true})
    }

    logout(){
        return this.afAuth.signOut().then(()=>{
            localStorage.removeItem('user')
            this.router.navigate(['login'])
        })
    }

}