package com.infy.api;
//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.infy.model.Customer;
import com.infy.service.CustomerService;

@CrossOrigin
@RestController
@RequestMapping(value="/rkobank")
public class CustomerAPI {
	
		
		@Autowired
		private CustomerService customerService;
		
		@Autowired
		private Environment environment;
		
	//	@GetMapping(value = "/customers")
		//public ResponseEntity<List<Customer>> getAllCustomerDetails() throws Exception{
			//List<Customer> customerList = customerService.geCustomer();
			//ResponseEntity<List<Customer>> response = new ResponseEntity<List<Customer>>(customerList, HttpStatus.OK);
			//return response;
		//} 
		
		@GetMapping(value = "/customers/{customerId}")
		public ResponseEntity<Customer> getCustomerDetails(@PathVariable Integer customerId) throws Exception  {
			try {
			Customer customer = customerService.getCustomer(customerId);
			ResponseEntity<Customer> response = new ResponseEntity<Customer>(customer, HttpStatus.OK);
			return response;
			}
			catch(Exception e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, environment.getProperty(e.getMessage()), e);
			}
		}
		
	    @PostMapping(value = "/customers")
		public ResponseEntity<String> addCustomer(@RequestBody Customer customer) throws Exception  {
	    	try {
			Integer id = customerService.addCustomer(customer);
			String successMessage = environment.getProperty("UserInterface.INSERT_SUCCESS")+id;
			ResponseEntity<String> response = new ResponseEntity<String>(successMessage, HttpStatus.CREATED);
			return response;
	    	}
	    	catch(Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, environment.getProperty(e.getMessage()), e);
			}
		}
	      
	    @PutMapping(value = "/customers/{customerId}")
		public ResponseEntity<String> updateCustomer(@PathVariable Integer customerId, @RequestBody Customer customer)  throws Exception {
			try {
	    	customerService.updateCustomer(customerId,customer.getEmailId());
			String successMessage = environment.getProperty("UserInterface.UPDATE_SUCCESS");
			ResponseEntity<String> response = new ResponseEntity<String>(successMessage, HttpStatus.OK);
			return response;
			}
			catch(Exception e) {
				throw new ResponseStatusException(HttpStatus.NOT_FOUND, environment.getProperty(e.getMessage()), e);
			}
		}
	    
		@DeleteMapping(value = "/customers/{customerId}")
		public ResponseEntity<String> deleteCustomer(@PathVariable Integer customerId) throws Exception  {
			try {
			customerService.deleteCustomer(customerId);
			String successMessage = environment.getProperty("UserInterface.DELETE_SUCCESS");
			ResponseEntity<String> response = new ResponseEntity<String>(successMessage, HttpStatus.OK);
			return response;
		}
		catch(Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, environment.getProperty(e.getMessage()), e);
		}
	  }		
	}

