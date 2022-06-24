import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }
   
  showSuccess(message, title){
    this.toastr.success(message, title)  
  }
   
  showError(message, title){
    this.toastr.error(message, title)
  }
   
  showInfo(message, title){
    this.toastr.info(message, title)
  }
   
  showWarning(message, title){
    this.toastr.warning(message, title)
  }

  sweetalert2(icon,title){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: icon,
      title: title
    })
  }

  sweetalert2Modal(title,text,icon,showCancelButton,confirmButtonText,cancelButtonText){
    return Swal.fire({
      title:title,
      text: text,
      icon: icon,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      iconColor:'red',
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      allowOutsideClick:false
    })
  }
}
