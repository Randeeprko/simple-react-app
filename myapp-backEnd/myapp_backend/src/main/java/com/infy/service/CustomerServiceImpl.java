package com.infy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infy.dao.CustomerDAO;
import com.infy.model.Customer;

@Service(value = "customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerDAO customerDAO;

	public Customer getCustomer(Integer customerId) throws Exception {

		Customer customer = customerDAO.getCustomer(customerId);

		if (customer == null) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}

		return customer;
	}

	public Integer addCustomer(Customer customer) throws Exception {

		if (customerDAO.getCustomer(customer.getCustomerId()) != null) {
			throw new Exception("Service.CUSTOMER_ALREADY_EXISTS");
		}

		return customerDAO.addCustomer(customer);

	}

	public Integer updateCustomer(Integer customerId, String emailId)
			throws Exception {
		Customer customer = customerDAO.getCustomer(customerId);

		if (customer == null) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}
		return customerDAO.updateCustomer(customerId, emailId);
	}

	public Integer deleteCustomer(Integer customerId) throws Exception {
		Customer customer = customerDAO.getCustomer(customerId);

		if (customer == null) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}
		return customerDAO.deleteCustomer(customerId);
	}

}
