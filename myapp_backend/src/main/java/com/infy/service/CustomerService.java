package com.infy.service;

import java.util.List;

import com.infy.model.Customer;

public interface CustomerService {
	public Integer addCustomer(Customer customer) throws Exception;
	public Customer getCustomer(Integer customerId) throws Exception;
	public Integer updateCustomer(Integer customerId, Customer customer)throws Exception;
	public Integer deleteCustomer(Integer customerId)throws Exception;
	public List<Customer> getCustomer() throws Exception;
}
