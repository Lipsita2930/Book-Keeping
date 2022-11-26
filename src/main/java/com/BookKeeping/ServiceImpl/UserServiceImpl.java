package com.BookKeeping.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BookKeeping.Model.Expense;
import com.BookKeeping.Model.User;
import com.BookKeeping.Repository.UserRepository;
import com.BookKeeping.Service.UserService;




@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository UserRepository;

	@Override
	public User saveUser(User user) {
		return UserRepository.save(user);
	}

	@Override
	public User fetchUserByEmail(String email) {
		return UserRepository.findByEmail(email);
	}
	
	@Override
	public Optional<User> fetchUserById(String id) {
		return UserRepository.findById(id);
	}
	
	
	@Override
	public User fetchUserByEmailAndPassword(String email, String password) {
		return UserRepository.findByEmailAndPassword(email, password);
	}

	@Override
	public List<User> getUser() {
		return UserRepository.findAll();
	}

	@Override
	public User findByName(String name) {
		return UserRepository.findByName(name);
	}

	@Override
	public User updateUserExpenseList(User user) {
		return UserRepository.save(user);
		
	}

	



	
	


}
