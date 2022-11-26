import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constant } from '../Utilities/Constant';
import { ExpenseDetails } from '../Utilities/ExpenseDetails';
import { journalDetails } from '../Utilities/journalDetails';
import { User } from '../Utilities/User';

@Injectable({
  providedIn: 'root'
})
export class RestServicesService {

  constructor(private httpClient:HttpClient) 
  { }
  

  //saving the Expense Details
  saveExpenseFromRemote(expense:ExpenseDetails,id:String):Observable<User>{
    return this.httpClient.put<any>(`${Constant.saveExpenseEndPoint}/${id}`,expense).pipe(retry(1),catchError(this.handleError));
  }

  //Getting the Expense Details
  getExpenseDetailsFromRemote(email:String):Observable<ExpenseDetails[]>{
      return this.httpClient.get<ExpenseDetails[]>(`${Constant.getExpenseEndPoint}/${email}`).
      pipe(retry(1),catchError(this.handleError));
  }

  //updating the user
  updateUserFromRemote(user:User,id:String):Observable<User>{
    return this.httpClient.put<any>(`${Constant.updateUserEndPoint}/${id}`,user).pipe(retry(1),catchError(this.handleError));
  }

  //update the Expense List
  updateExpenseFromRemote(expense:ExpenseDetails,userId:String,expenseId:String):Observable<User>{
     return this.httpClient.put<any>(`${Constant.updateExpenseEndPoint}/${userId}/${expenseId}`,expense).pipe(retry(1),catchError(this.handleError));
  }

  //deleteing the Expense By its Id
  deleteExpenseFromRemote(userId:String,expenseId:String):Observable<User>{
   return this.httpClient.delete<any>(`${Constant.deleteExpenseEndPoint}/${userId}/${expenseId}`).pipe(retry(1),catchError(this.handleError));
  }
  handleError(err:any){
    return throwError(()=>{
      console.log(err);
    });
}
}
