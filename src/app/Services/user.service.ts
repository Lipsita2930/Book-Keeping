import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constant } from '../Utilities/Constant';
import { User } from '../Utilities/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) { }

 //Loging into the user
  loginUserFromRemote(user:User):Observable<any>{
    const header=new HttpHeaders();
    header.set('Content-Type','application/json');
    return this.httpclient.post<any>(`${Constant.signinEndPoint}`,user,{'headers':header}).pipe(retry(1),catchError(this.handleError));
  }

  //Registration
  registrationUserFromRemote(user:User):Observable<any>{
    const header=new HttpHeaders();
    header.set('Content-Type','application/json');
    return this.httpclient.post<any>(`${Constant.signupEndPoint}`,user,{'headers':header}).pipe(retry(1),catchError(this.handleError));
  }


  //Getting the User from its Email
  getUserByEmail(email:String):Observable<any>{
    return this.httpclient.get<User>(`${Constant.getUserByEmailEndPoint}/${email}`).
    pipe(retry(1),catchError(this.handleError));
  }


  //Getting all the user
  getAllUser():Observable<any>{
    return this.httpclient.get<User>(`${Constant.getEndPoint}`).
    pipe(retry(1),catchError(this.handleError));
  }


  handleError(err:any){
    return throwError(()=>{
      console.log(err);
    });
}
}
