import React,{Component} from 'react'
import axios from 'axios'
class addCustomer extends Component {
    constructor(props){
        super(props)
        this.state={ 
                     formValue: {
                         customerId:'',
                         emailId: '',
                         name: '',
                         dateOfBirth: ''
                    },
                     formErrorMessage: {
                          customerId: "",
                          emailId: "",
                          name: "",
                          dateOfBirth: ""
                     },
                     formValid: {
                        customerId: false,
                        emailId: false,
                        name: false,
                        dateOfBirth: false,
                        buttonActive:false
                     },
                     errorMessage:"",
                     successMessage:""
                    }
    }
    
    handleChange = (event) => {
        const {name,value} = event.target
        const {formValue} =  this.state
       this.setState({formValue: { ...formValue,[name]: value}})
        this.validateField(name,value)
    }
    
    validateField = (name,value) => {
          var{formErrorMessage} = this.state
          var{formValid} = this.state
          switch(name){
              case "customerId":
                  if(value === ""){
                     formErrorMessage.customerId = "Field required"
                     formValid.customerId = false
                  }  
                  else if(!value.match(/^[0-9]{5}$/)){
                      formErrorMessage.customerId ="Customer Id should have 5 digits"
                      formValid.customerId= false 
                  }   
                  else {
                       formErrorMessage.customerId = ""
                       formValid.customerId = true  
                  }    
                 break;
              case "name":
                if(value === ""){
                    formErrorMessage.name = "Field required"
                    formValid.name = false
                 }  
                 else if(!(value.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/))){
                     formErrorMessage.name ="valid name should be of type Virat Kohli"
                     formValid.name= false 
                 }   
                 else {
                      formErrorMessage.name = ""
                      formValid.name = true   
                 }  
                 break;
              case "emailId":
                if(value === ""){
                    formErrorMessage.emailId = "Field required"
                    formValid.emailId = false
                 } 
                 else if(!(value.match(/^[a-zA-Z0-9]+@[A-Za-z]+(.(com|in))$/))){
                      formErrorMessage.emailId = "Email Id should be valid"
                      formValid.emailId = false   
                 }  
                 else{
                      formErrorMessage.emailId =""
                      formValid.emailId = true
                 }
                 break;
              case "dateOfBirth":
                  if(value === ""){
                      formErrorMessage.dateOfBirth = "Field required"
                      formValid.dateOfBirth = false
                  }
                  else {
                      formErrorMessage.dateOfBirth = ""
                      formValid.dateOfBirth = true
                  }
                  break;
              default:
                  break;
          }
          formValid.buttonActive = formValid.customerId && formValid.name && formValid.emailId && formValid.dateOfBirth
          this.setState({formErrorMessage:formErrorMessage,formValid:formValid})
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
       this.submitBooking()
        console.log("Form is submitted successfully")
        console.table([this.state])
    }
    
    submitBooking = () => {
       var{formValue} = this.state
        axios.post('http://localhost:5565/rkobank/customer',formValue)
        .then((response) => {
          console.table([response.data]); // This will print response data received from web service.
       this.setState({successMessage:response.data,errorMessage:''})
      }).catch((error) => {
          if(error.response){
            this.setState({errorMessage:error.response.data.message,successMessage:''})
            console.table([error.response])
          }
          else
            this.setState({errorMessage:error.message+" Plz run the backend",successMessage:''})
      })
      
      
    }
    render(){
        const{customerId,emailId,name,dateOfBirth} = this.state.formValue
        return(
            <div className="container">
            <h2 className="text text-primary text-center">Customer Registration Form</h2>
    <form onSubmit={this.handleSubmit}>
    <div className = "form-group" >
        <label htmlFor="cid">Customer Id:  </label>
        <input className="form-control" placeholder="e.g. - 10000" value={customerId} onChange={this.handleChange} type="number" name="customerId"/>
        <span className="text-danger">{this.state.formErrorMessage.customerId}</span>
    </div>
    <div className = "form-group" >
        <label htmlFor="name">Name: </label>
        <input className="form-control" placeholder="e.g. Randy Orton" value={name} onChange={this.handleChange} type="text" name="name"/>
        <span className="text-danger">{this.state.formErrorMessage.name}</span>
    </div>
     <div className="form-group">
        <label htmlFor="eId">Email Id </label>
        <input type="email" name="emailId" placeholder="e.g. rko@gmail.com" onChange={this.handleChange} value={emailId} className="form-control"/>
        <span className="text-danger">{this.state.formErrorMessage.emailId}</span>
     </div>
     <div className="form-group">
        <label htmlFor="dob">Date Of Birth </label>
        <input type="date" name="dateOfBirth" onChange={this.handleChange} value={dateOfBirth} className="form-control"/>
        <span className="text-danger">{this.state.formErrorMessage.dateOfBirth}</span>
     </div>
      
    <button type="submit" className="btn btn-secondary" disabled={!this.state.formValid.buttonActive}>Submit</button> 
    
    
    </form>
    
    <span className="text-success">{this.state.successMessage}</span>
    <span className="text-danger">{this.state.errorMessage}</span>
        </div>
        );
    }
}

export default addCustomer;