package com.BookKeeping.Service;

import java.util.List;
import java.util.Optional;

import com.BookKeeping.Model.Expense;
import com.BookKeeping.Model.User;


public interface UserService{
	
	 public User saveUser(User user);
	 
	 public User fetchUserByEmail(String email) ;
	 
	 public Optional<User> fetchUserById(String id);
	 
	 public User fetchUserByEmailAndPassword(String email,String password);
	 
	 public List<User> getUser();
	 
	 public User findByName(String name);
	 
	 public User updateUserExpenseList(User user);
	 
	

}
