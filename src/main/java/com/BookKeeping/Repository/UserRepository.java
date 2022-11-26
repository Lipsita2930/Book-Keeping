package com.BookKeeping.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import com.BookKeeping.Model.User;



@Repository("UserRepository")
public interface UserRepository extends MongoRepository<User,String>{

	public User findByEmail(String email);
	
	public User findByEmailAndPassword(String email,String password);
	public User findByName(String name);

	
	
	
}
