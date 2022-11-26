import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Utilities/User';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  updateRegistrationForm:FormGroup ;
  user=new User();
  email:String='';
  userId:String='';

  constructor(@Inject (MAT_DIALOG_DATA) public editData:any,private userservice:UserService,private restService:RestServicesService,
  private sharedService:SharedService, public dialogRef: MatDialogRef<UpdateUserComponent>) { 
    this.updateRegistrationForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(4)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required]),
      occupation:new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    if(this.editData){
      this.email=this.editData.email;
      this.updateRegistrationForm.controls['name'].setValue(this.editData.name);
      this.updateRegistrationForm.controls['email'].setValue(this.editData.email);
      this.updateRegistrationForm.controls['phone'].setValue(this.editData.phone);
      this.updateRegistrationForm.controls['occupation'].setValue(this.editData.occupation);
  }
}
get regFunction(){
  return this.updateRegistrationForm.controls;
}
updateListener(){
  this.user=this.updateRegistrationForm.value;
  this.user.password=this.editData.password;
  this.user.expenseList=this.editData.expenseList;
  localStorage.clear();
  localStorage.setItem('currentUser',JSON.stringify(this.user));
  this.userservice.getUserByEmail(this.email).subscribe(data=>{
    this.userId=data.id;
    this.restService.updateUserFromRemote(this.user,this.userId).subscribe(
     data =>{
       console.log("response received");
       window.location.reload();
       this.sharedService.sharedNotification("Data updated Successfully","ok");
       this.dialogRef.close();
     },
     error =>{console.log("Error Ocurred");});
   });
}
}
