package com.BookKeeping.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BookKeeping.Model.Expense;
import com.BookKeeping.Model.User;
import com.BookKeeping.Service.ExpenseService;
import com.BookKeeping.Service.UserService;

@CrossOrigin(origins="http://localhost:4200/")
@RestController
@RequestMapping("/BookKeeping")
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;
	
	@Autowired
	private UserService userService;

	
    //Saving the Expense of a particular User
	@PutMapping(path="/saveExpenseDetails/{id}")
	public User saveExpenseDetails(@PathVariable String id,@RequestBody Expense expense)throws Exception {
		Optional<User> res=userService.fetchUserById(id);
		
		//generating random number for id of the expense
		Random random=new Random();
		long randNum=random.nextLong();
		expense.setId(String.valueOf(Math.abs(randNum)));
	     if(res.isPresent()) {
	    	 User user=res.get();
	    	 List<Expense> expenseList=user.getExpenseList();
	    	 expenseList.add(expense);
	    	 User ans=userService.saveUser(user);
	    	 return ans;
	     }
	    return null;
	}
		
	
    //Getting all the expense Details
	@GetMapping("/getExpenseDetails")
	public List<Expense> getUser(){
		return expenseService.getExpenseDetails();
	}

	//Update the expense of a particular User
	@PutMapping("/updateExpenseById/{userId}/{expenseId}")
	public User updateExpenseById(@PathVariable String userId,@PathVariable String expenseId,@RequestBody Expense expense)throws Exception{
		Optional<User> res=userService.fetchUserById(userId);
		 if(res.isPresent()) {
			User user=res.get();
			List<Expense> expenseList=user.getExpenseList();
			for(Expense e:expenseList) {
				System.out.println("eId: "+e.getId()+"  ExpenseIDURL: "+expenseId+"  "+e.getId().equals(expenseId));
				if(e.getId().equals(expenseId)) {
					e.setId(expenseId);
					e.setExpenseType(expense.getExpenseType());
					e.setAmount(expense.getAmount());
					e.setTransactionType(expense.getTransactionType());
					e.setAssetType(expense.getAssetType());
					e.setDueDate(expense.getDueDate());
					e.setStatus(expense.getStatus());
					e.setFinancialType(expense.getFinancialType());
					e.setNotes(expense.getNotes());
					e.setCgst(expense.getCgst());
					e.setSgst(expense.getSgst());
					e.setIgst(expense.getIgst());
					e.setSupplierName(expense.getSupplierName());
					User ans=userService.saveUser(user);
					return ans;
				}
			}
			System.out.println("Donot find the expense");
			
		}
		 else {
		 System.out.println("donot find the User");
		 }
		return null;
	}   
	
	//Deleting the expense of a particular User
	@DeleteMapping("/deleteExpenseById/{userId}/{expenseId}")
	public User deleteExpenseById(@PathVariable String userId,@PathVariable String expenseId) {
		Optional<User> res=userService.fetchUserById(userId);
		 if(res.isPresent()) {
		 User user=res.get();
		 List<Expense> expenseList=user.getExpenseList();
		 for(Expense e:expenseList) {
		  System.out.println("eId: "+e.getId()+"  ExpenseIDURL: "+expenseId+"  "+e.getId().equals(expenseId));
		  if(e.getId().equals(expenseId)) {
			expenseList.remove(e);
			User ans=userService.saveUser(user);
				return ans;
		  }
	      }
		 }
		 else {
			 System.out.println("Not a user");
		 }
		 return null;
	}
	
}
