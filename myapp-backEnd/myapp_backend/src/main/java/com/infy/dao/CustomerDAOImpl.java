package com.infy.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import com.infy.entity.CustomerEntity;
import com.infy.model.Customer;

@Repository(value = "customerDAO")
public class CustomerDAOImpl implements CustomerDAO {

	@PersistenceContext
	private EntityManager entityManager;

	public Integer addCustomer(Customer customer) {

		Integer customerId = null;

		CustomerEntity entity = new CustomerEntity();
		entity.setCustomerId(customer.getCustomerId());
		entity.setDateOfBirth(customer.getDateOfBirth());
		entity.setEmailId(customer.getEmailId());
		entity.setName(customer.getName());
		entityManager.persist(entity);

		customerId = entity.getCustomerId();

		return customerId;

	}

	public Customer getCustomer(Integer customerId) {

		Customer customer = null;

		CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);
		if (customerEntity != null) {
			customer = new Customer();
			customer.setCustomerId(customerEntity.getCustomerId());
			customer.setDateOfBirth(customerEntity.getDateOfBirth());
			customer.setEmailId(customerEntity.getEmailId());
			customer.setName(customerEntity.getName());
		}

		return customer;
	}

	public Integer updateCustomer(Integer customerId, String emailId) {

		Integer cId = null;

		CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);
		customerEntity.setEmailId(emailId);
		cId = customerEntity.getCustomerId();

		return cId;
	}

	public Integer deleteCustomer(Integer customerId) {

		Integer cId = null;
		CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);
		entityManager.remove(customerEntity);
		cId = customerEntity.getCustomerId();

		return cId;
	}

}