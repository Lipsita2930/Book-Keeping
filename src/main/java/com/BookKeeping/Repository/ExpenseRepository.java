package com.BookKeeping.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.BookKeeping.Model.Expense;

@Repository("Expense Repository")
public interface ExpenseRepository extends MongoRepository<Expense,Long>{

}
