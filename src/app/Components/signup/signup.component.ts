import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/Utilities/User';
import { UserService } from 'src/app/Services/user.service';
import { SharedService } from 'src/app/Services/shared.service';
import { MatDialogRef } from '@angular/material/dialog';
import { WelcomePageComponent } from 'src/app/Screen/welcome-page/welcome-page.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user=new User();
  userEmail:String='';
  msgreg:string='';
  msglog:string='';
  userDetails:any;
  userInfo:User|undefined;
  userArray:any;
  
  flag:number=0;
  msg:String='';
  right:number=0;
  loginForm:FormGroup;
  registrationForm:FormGroup;
  numberRegEx = "^[1-9][0-9]*$";

  constructor(private userService:UserService,private route:Router,private sharedService :SharedService,
    public dialogRef: MatDialogRef<WelcomePageComponent>) {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    });
    this.registrationForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(4)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required]),
      occupation:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    })

  }
  currentUser:User | undefined;
  ngOnInit(): void {
   
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]')
    console.log(this.currentUser)
    if(this.currentUser?.email)
    {
      this.route.navigate(['/main/home'])
    }
      
  }
  signUpListener(){
    this.right=1;
  }
  signInListener(){
    this.right=0;
  }
  get loginFunction(){
    return this.loginForm.controls;
  }
  get regFunction(){
    return this.registrationForm.controls;
  }
  loginUser(){
   this.userService.loginUserFromRemote(this.user).subscribe(
    data =>{
      console.log("response received");
      this.userEmail=this.user.email;
      this.userService.getUserByEmail(this.userEmail).subscribe(data=>{
       this.userInfo=data;
       let navigationExtras: NavigationExtras = {
        state: this.userInfo
      };
      localStorage.setItem('currentUser',JSON.stringify(this.userInfo));
    
      this.route.navigate(['/main/home'],navigationExtras);
     })
     this.dialogRef.close();
    
    },
    error =>{console.log("Error Ocurred");
    this.msglog="Bad Credentials,Please Enter valid Details";}
   )
  }
  registerUser(){
    this.userService.registrationUserFromRemote(this.user).subscribe(
      data =>{
        console.log("response received");
        this.sharedService.sharedNotification("Registered Successfully,Please Login","ok");
      },
      error =>{console.log("Error Ocurred");
      this.msgreg=`User with ${this.user.email} email already Exist`;}
     )
  }
Email(e:any){
  console.log(e.target.value);
 //get all the user of the database
 this.userService.getAllUser().subscribe(
  data=>{console.log(data) ;
    this.userArray=data;
    for(let i=0;i<this.userArray.length;i++){
      if(this.userArray[i].email==e.target.value){
        this.msg="Email  "+e.target.value+" already exist"
        this.flag=1;
        break;
      }
      else{
        this.msg="";
      }
    }

});
}

}
