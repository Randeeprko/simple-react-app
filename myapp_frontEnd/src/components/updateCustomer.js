import React,{Component} from 'react'
import axios from 'axios'
class updateCustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
              formValue : {
                  customerId : this.props.match.params.customerId,
                  emailId : ''
              },
              formErrorMessage : {
                  customerId : '',
                  emailId : ''
              },
              formValid : {
                  customerId : false,
                  emailId : false,
                  buttonActive : false
              },
              errorMessage : "",
              successMessage : ""
        }
    }

    handleChange = (event) => {
        const {name,value} = event.target
        const {formValue} = this.state
        this.setState ({formValue : {
            ...formValue , [name]: value
        }})
        this.validateField(name,value)
    }

    validateField = (name,value) => {
        const {formErrorMessage,formValid,formValue} = this.state
        if(name === "emailId"){
            if(value === ""){
                formErrorMessage.emailId = "Field required"
                formValid.emailId = false
             }  
             else if(!value.match(/^[a-zA-Z0-9]+@[A-Za-z]+(.(com|in))$/)){
                 formErrorMessage.emailId ="Email Id should be valid"
                 formValid.emailId= false 
             }   
             else {
                  formErrorMessage.emailId = ""
                  formValid.emailId = true  
             }    
        }
        if(formValue.customerId > 0 && formValue.customerId < 99999){
               formErrorMessage.customerId = ""
               formValid.customerId = true    
        }
        formValid.buttonActive = formValid.emailId && formValid.customerId
        this.setState({formValid:formValid, formErrorMessage: formErrorMessage})
    }

    handleSubmit = (event) => {
     event.preventDefault()
     this.submitBooking()
     console.log("form is submitted successfully")
     console.table([this.state])
    }

    submitBooking = () => {
        var{formValue} = this.state
         axios.put('http://localhost:5565/rkobank/customers/'+this.state.formValue.customerId,formValue)
         .then((response) => {
           console.table([response.data]); // This will print response data received from web service.
        this.setState({successMessage:response.data,errorMessage:''})
       }).catch((error) => {
           if(error.response){
             this.setState({errorMessage:error.response.data.message,successMessage:''})
             console.table([error.response])
           }
           else
             this.setState({errorMessage:error.message+"Plz run the backend",successMessage:''})
       })
       
       
     }
    render(){
        const {emailId,successMessage,errorMessage,formValid} = this.state
        return(
            <div className  = "container">
                <form onSubmit = {this.handleSubmit}>
                    <div className = "form-group">
                      <label htmlFor = "eId" > Email Id : </label>
                      <input className = "form-control" 
                      name = "emailId"
                      id ="eId"
                      onChange = {this.handleChange}
                      type = "email"
                      placeholder = "e.g. rko@gmail.com" 
                      value = {emailId}></input>
                    </div>
                    <button type = "submit" disabled = {!formValid.buttonActive} className = "btn btn-secondary">Submit</button>
                </form>
                <span className="text-success">{successMessage}</span>
                <span className="text-danger">{errorMessage}</span>

            </div>
        )
    }
}

export default updateCustomer;