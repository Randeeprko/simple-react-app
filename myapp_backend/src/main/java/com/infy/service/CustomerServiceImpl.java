package com.infy.service;

import java.util.List;

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

	public Integer updateCustomer(Integer customerId, Customer c)
			throws Exception {
		Customer customer = customerDAO.getCustomer(customerId);

		if (customer == null) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}
		return customerDAO.updateCustomer(customerId, c);
	}

	public Integer deleteCustomer(Integer customerId) throws Exception {
		Customer customer = customerDAO.getCustomer(customerId);

		if (customer == null) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}
		return customerDAO.deleteCustomer(customerId);
	}

	@Override
	public List<Customer> getCustomer() throws Exception {
		// TODO Auto-generated method stub
		List<Customer> Listcustomer = customerDAO.getCustomer();

		if (Listcustomer.size() == 0) {
			throw new Exception("Service.CUSTOMER_UNAVAILABLE");
		}

		return Listcustomer;
	}

}
