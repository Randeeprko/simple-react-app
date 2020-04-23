package com.infy.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

	public Integer updateCustomer(Integer customerId, Customer customer) {

		Integer cId = null;

		CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);
		customerEntity.setEmailId(customer.getEmailId());
		customerEntity.setName(customer.getName());
		customerEntity.setDateOfBirth(customer.getDateOfBirth());
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

	@Override
	public List<Customer> getCustomer() throws Exception {
		// TODO Auto-generated method stub
		List<Customer> listCustomer = new ArrayList<Customer>();
         Query q = entityManager.createQuery("Select ce from CustomerEntity ce");
         List<CustomerEntity> lce = q.getResultList();
		if (lce.size() != 0) {
			for (CustomerEntity ce : lce) {
				Customer customer = new Customer();
				customer.setCustomerId(ce.getCustomerId());
				customer.setDateOfBirth(ce.getDateOfBirth());
				customer.setEmailId(ce.getEmailId());
				customer.setName(ce.getName());
				listCustomer.add(customer);
			}
			
		}

		return listCustomer;
		
	}

}