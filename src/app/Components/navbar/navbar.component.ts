import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog:MatDialog , private router : Router){}

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') !== null){
      this.router.navigate(['/main/home']);
    }
  }

  loginListener(){
    this.dialog.open(SignupComponent,{
      width:'70%',
      id: 'dialogTrasparent',
      
    });
  }

}
