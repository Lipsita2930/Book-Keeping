import { environment } from "src/environments/environment";

export module Constant{
    const baseUrl:String=environment.baseURL;
    //getting all User
    export const getEndPoint:String=`${baseUrl}/registration/getAllUser`;

    // Endpoints for signin and signup
    export const signinEndPoint:String=`${baseUrl}/registration/signin`;
    export const signupEndPoint:String=`${baseUrl}/registration/signup`;

    //Getting all the details of User from its email id
    export const getUserByEmailEndPoint:String=`${baseUrl}/registration/getUserByEmail`;

    export const saveExpenseEndPoint:String=`${baseUrl}/BookKeeping/saveExpenseDetails`;
    export const getExpenseEndPoint:String=`${baseUrl}/registration/getExpenseDetailsByUserName`;

    //Update User Details
    export const updateUserEndPoint:String=`${baseUrl}/registration/updateUser`;

    //Update Expense Details of a user
    export const updateExpenseEndPoint:String=`${baseUrl}/BookKeeping/updateExpenseById`;

    //Delete ExpenseDetails of a User
    export const deleteExpenseEndPoint:String=`${baseUrl}/BookKeeping/deleteExpenseById`
}
