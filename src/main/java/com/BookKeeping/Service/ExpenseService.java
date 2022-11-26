package com.BookKeeping.Service;

import java.util.List;

import com.BookKeeping.Model.Expense;


public interface ExpenseService {

	public Expense saveExpense(Expense expense);
	 
	public List<Expense> getExpenseDetails();
}
