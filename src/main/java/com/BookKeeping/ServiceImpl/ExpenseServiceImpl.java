
package com.BookKeeping.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BookKeeping.Model.Expense;
import com.BookKeeping.Repository.ExpenseRepository;
import com.BookKeeping.Service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	private ExpenseRepository expenseRepository;
	

	@Override
	public Expense saveExpense(Expense expense) {
		return expenseRepository.save(expense);
	}


	@Override
	public List<Expense> getExpenseDetails() {
		return expenseRepository.findAll();
	}

}
