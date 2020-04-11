package com.infy.service;

import com.infy.model.Customer;

public interface CustomerService {
	public Integer addCustomer(Customer customer) throws Exception;
	public Customer getCustomer(Integer customerId) throws Exception;
	public Integer updateCustomer(Integer customerId, String emailId)throws Exception;
	public Integer deleteCustomer(Integer customerId)throws Exception;
}
