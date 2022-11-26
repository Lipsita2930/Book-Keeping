import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../Utilities/User';

@Injectable({
  providedIn: 'root'
})
export class SharedService  {

  userDetails:any;

  constructor(private snackBar:MatSnackBar) {}

 setUserDetails(userDetails:any){
 this.userDetails=userDetails;
  }
  getUserDetails(){
    return this.userDetails;
  }

  sharedNotification(display:string,Buttontext:string){
    this.snackBar.open(display,Buttontext,{
      duration:5000, 
      horizontalPosition:'center',
      verticalPosition:'bottom',
    })
  }

}
