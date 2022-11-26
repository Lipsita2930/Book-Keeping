package com.BookKeeping.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="ExpenseDetails")
public class Expense {
	@Id
    private String id;
	private String expenseType;
    private double amount;
    private String dueDate;
    private String assetType;
	private String transactionType;
	private String financialType;
	private String paymentType;
	private String status;
	private String notes;
	private double sgst;private double cgst;
	private double igst;
	private String supplierName;
	public Expense() {
		super();
	}

	public Expense( String expenseType, double amount, String dueDate, String assetType,
			String transactionType, String financialType, String paymentType, String status, String notes, double sgst,
			double cgst, double igst, String supplierName) {
		super();
		this.expenseType = expenseType;
		this.amount = amount;
		this.dueDate = dueDate;
		this.assetType = assetType;
		this.transactionType = transactionType;
		this.financialType = financialType;
		this.paymentType = paymentType;
		this.status = status;
		this.notes = notes;
		this.sgst = sgst;
		this.cgst = cgst;
		this.igst = igst;
		this.supplierName = supplierName;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getExpenseType() {
		return expenseType;
	}
	public void setExpenseType(String expenseType) {
		this.expenseType = expenseType;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public String getFinancialType() {
		return financialType;
	}
	public void setFinancialType(String financialType) {
		this.financialType = financialType;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public double getSgst() {
		return sgst;
	}
	public void setSgst(double sgst) {
		this.sgst = sgst;
	}
	public double getCgst() {
		return cgst;
	}
	public void setCgst(double cgst) {
		this.cgst = cgst;
	}
	public double getIgst() {
		return igst;
	}
	public void setIgst(double igst) {
		this.igst = igst;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	
}
