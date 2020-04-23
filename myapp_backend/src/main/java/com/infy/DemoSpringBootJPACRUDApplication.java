package com.infy;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import com.infy.model.Customer;
import com.infy.service.CustomerServiceImpl;

@SpringBootApplication
public class DemoSpringBootJPACRUDApplication implements CommandLineRunner {
	@Autowired
	CustomerServiceImpl customerService;

	@Autowired
	Environment environment;

	public static void main(String[] args) {
		SpringApplication.run(DemoSpringBootJPACRUDApplication.class, args);

	}

	public void run(String... args) throws Exception {

		//addCustomer();
	    // getCustomer();
		// updateCustomer();
		// deleteCustomer();
	}

	public void addCustomer() {

		Customer customer = new Customer();
		customer.setCustomerId(12345);
		customer.setEmailId("Harry@infy.com");
		customer.setName("Harry");
		customer.setDateOfBirth(LocalDate.now());

		try {
			Integer id = customerService.addCustomer(customer);
			System.out.println(environment.getProperty("UserInterface.INSERT_SUCCESS") + id);
		} catch (Exception e) {

			if (e.getMessage() != null)
				System.out.println(environment.getProperty(e.getMessage(),
						"Something went wrong. Please check log file for more details."));
		}

	}

	public void getCustomer() {
		try {

			Customer customer = customerService.getCustomer(12345);
			System.out.println("Customer id : " + customer.getCustomerId());
			System.out.println("Customer name : " + customer.getName());
			System.out.println("Customer email : " + customer.getEmailId());
		} catch (Exception e) {

			if (e.getMessage() != null)
				System.out.println(environment.getProperty(e.getMessage(),
						"Something went wrong. Please check log file for more details."));
		}
	}
	public void updateCustomer() {
		try {
			Customer customer = new Customer();
			customer.setEmailId("Harry0123@infy.com");
			customer.setName("Harry111");
			customer.setDateOfBirth(LocalDate.now());
			customerService.updateCustomer(12345, customer);
			System.out.println(environment.getProperty("UserInterface.UPDATE_SUCCESS"));
		} catch (Exception e) {

			if (e.getMessage() != null)
				System.out.println(environment.getProperty(e.getMessage(),
						"Something went wrong. Please check log file for more details."));
		}
	}
	public void deleteCustomer() {
		try {
			customerService.deleteCustomer(12345);
			System.out.println(environment.getProperty("UserInterface.DELETE_SUCCESS"));
		} catch (Exception e) {

			if (e.getMessage() != null)
				System.out.println(environment.getProperty(e.getMessage(),
						"Something went wrong. Please check log file for more details."));
		}
	}

	
}
