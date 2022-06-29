import { Component, OnInit } from '@angular/core';
import { TasksheetService } from 'src/app/service/tasksheet.service';
import Swal from 'sweetalert2';
import { AdminProfileService } from '../../admin/service/admin-profile.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  admin:any
  mailData:any;
  constructor(private adminService:AdminProfileService,private tasksheetService:TasksheetService) { }

  ngOnInit(): void {
    this.adminService.adminRef.valueChanges().subscribe(data=>{
      this.admin = data
    })
  }

  async Contact(){
    const { value: formValues } = await Swal.fire({
      title: 'Contact',
      html:
        '<input id="swal-input1" placeholder="Your Name"  style="border-left:3px solid #7386D5" class="swal2-input">' +
        '<br>'+
        '<input id="swal-input2" placeholder="Your Email"  style="border-left:3px solid #7386D5" class="swal2-input">'+
        '<br>'+
        '<input id="swal-input5" placeholder="Your password" type="password"  style="border-left:3px solid #7386D5" class="swal2-input">'+
        '<br>'+
        '<input id="swal-input3" placeholder="Subject" style="border-left:3px solid #7386D5" class="swal2-input">'+
        '<br>'+
        '<input id="swal-input4" placeholder="Type message..." style="border-left:3px solid #7386D5" class="swal2-textarea">',
      showCancelButton:true,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      allowOutsideClick:false,
      preConfirm: () => {
        var array ={
          name:(<HTMLInputElement>document.getElementById('swal-input1')).value,
          email:(<HTMLInputElement>document.getElementById('swal-input2')).value,
          password:(<HTMLInputElement>document.getElementById('swal-input5')).value,
          subject:(<HTMLInputElement>document.getElementById('swal-input3')).value,
          description:(<HTMLInputElement>document.getElementById('swal-input4')).value
        }
        return array
      }
    })
    
    if (formValues) {
      this.mailData = formValues
      this.tasksheetService.sendMessage(this.mailData).subscribe(data=>{
        console.log(data);   
      })
    }
    
  }

}
