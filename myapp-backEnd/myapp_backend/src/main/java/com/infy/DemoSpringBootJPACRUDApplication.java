package com.infy;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import com.infy.model.Customer;
import com.infy.model.CustomerType;
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
		customer.setCustomerType(CustomerType.GOLD);

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
			System.out.println("Customer type : " + customer.getCustomerType());
		} catch (Exception e) {

			if (e.getMessage() != null)
				System.out.println(environment.getProperty(e.getMessage(),
						"Something went wrong. Please check log file for more details."));
		}
	}
	public void updateCustomer() {
		try {
			customerService.updateCustomer(12345, "harry01@infy.com");
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
