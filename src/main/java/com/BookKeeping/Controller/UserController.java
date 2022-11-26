package com.BookKeeping.Controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BookKeeping.Model.Expense;
import com.BookKeeping.Model.User;
import com.BookKeeping.Service.UserService;


@CrossOrigin(origins="http://localhost:4200/")

@RestController
@RequestMapping(path="/registration")
public class UserController {
	
	@Autowired
	private UserService UserService;
	
	//Registration
	@PostMapping(path="/signup")
	public User saveUser(@RequestBody User user)throws Exception {
		System.out.println("muser"+user);
		String tempEmailId=user.getEmail();
		if(tempEmailId!=null && !"".equals(tempEmailId)) {
			User userobj=UserService.fetchUserByEmail(tempEmailId);
			if(userobj!=null) {
				throw new Exception("User with "+tempEmailId+" is already exist");
			}
		}
		User userobj=null;
		userobj= UserService.saveUser(user);
		return userobj;
		
	}
	
	//Login
	@PostMapping(path="/signin")
	public User loginUser(@RequestBody User user) throws Exception {
		String tempEmail=user.getEmail();
		String tempPassword=user.getPassword();
		User userobj=null;
		if(tempEmail!=null && tempPassword!=null) {
			 userobj=UserService.fetchUserByEmailAndPassword(tempEmail, tempPassword);
		}
		if(userobj==null) {
			throw new Exception("Bad Credentials");
		}
		return userobj;
	}
	
	//Getting all the user in the database
	@GetMapping(path="/getAllUser")
	public List<User> getUser(){
		return UserService.getUser();
	}
	
	
	//Getting the User Details by the EmailId
	@CrossOrigin(origins="http://localhost:4200/")
	@GetMapping(path="/getUserByEmail/{email}")
	public User getUserByEmail(@PathVariable String email) {
		User user= UserService.fetchUserByEmail(email);
		return user;
	}
	
	
	//Getting all the expenseDetails by user name
	@GetMapping("/getExpenseDetailsByUserName/{email}")
	public List<Expense> getUserExpenseDetailsByEmail(@PathVariable String email) {
		User user= UserService.fetchUserByEmail(email);
		return user.getExpenseList();
	}
	
  
	//Updating the User by its Id
  	@PutMapping(path="/updateUser/{id}")
    public User updateUser(@PathVariable String id ,@RequestBody User user)throws Exception {
		Optional<User> res=UserService.fetchUserById(id);
	     if(res.isPresent()) {
	    	 User puser=res.get();
	    	 puser.setEmail(user.getEmail());
	    	 puser.setName(user.getName());
	    	 puser.setOccupation(user.getOccupation());
	    	 puser.setPhone(user.getPhone());
	    	 User ans=UserService.saveUser(puser);
	    	 return ans;
	     }
	    return null;
    }

}

