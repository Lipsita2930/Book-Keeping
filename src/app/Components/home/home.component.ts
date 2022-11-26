import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Utilities/User';
import { UpdateUserComponent } from '../update-user/update-user.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  userstate: any;
  userInfo: User | undefined;
  email: String = '';

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService,
    private dialog: MatDialog) {
    this.userstate = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(this.currentUser);
  }
  updateListener() {
    this.dialog.open(UpdateUserComponent, {
      width: '30%',
      id: "updateUserForm",
      backdropClass: "updateFormBackDrop",
      data: this.currentUser
    });
  }

}
