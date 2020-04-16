import React,{Component} from 'react'
import axios from 'axios'

const getUrl = "http://localhost:5565/rkobank/customers/";
class UpdateCustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
              formValue : {
                  customerId : this.props.match.params.customerId,
                  emailId : '',
                  name: '',
                  dateOfBirth: ''
              },
              formErrorMessage : {
                  customerId : '',
                  emailId : '',
                  name: '',
                  dateOfBirth: ''
              },
              formValid : {
                  customerId : true,
                  emailId : true,
                  buttonActive : true,
                  name: true,
                  dateOfBirth: true
              },
              errorMessage : "",
              successMessage : ""
        }
    }

    componentDidMount(){
        this.fetchCustomer();
    }
    
    fetchCustomer = () => {
        let cId = this.props.match.params.customerId;
        axios.get(getUrl+cId)
     .then((response) => {
         console.table([response.data]);
         this.setState({formValue :response.data, errorMessage: ''})
     }).catch((error) => {
        if(error.response){
            this.setState({errorMessage:error.response.data.message,successMessage:''})
            console.table([error.response])
          }
          else
            this.setState({errorMessage:"Could not fetch customers data",successMessage:''})
     })
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
        switch(name){
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
      if(formValue.customerId > 0 && formValue.customerId < 99999){
        formErrorMessage.customerId = ""
        formValid.customerId = true    
      }
      formValid.buttonActive = formValid.customerId && formValid.name && formValid.emailId && formValid.dateOfBirth
       
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
             this.setState({errorMessage:error.message+" Plz run the backend",successMessage:''})
       })
       
       
     }
    render(){
        const {formValue,successMessage,errorMessage,formValid,formErrorMessage} = this.state
        return(
            <div className  = "container">
                <form onSubmit = {this.handleSubmit}>
        <div className = "form-group" >
        <label htmlFor="cid">Customer Id:  </label>
        <input className="form-control" placeholder="e.g. - 10000" value={formValue.customerId} type="number" name="customerId"/>
        <span className="text-danger">{formErrorMessage.customerId}</span>
        </div>
        <div className = "form-group" >
        <label htmlFor="name">Name: </label>
        <input className="form-control" placeholder="e.g. Randy Orton" value={formValue.name} onChange={this.handleChange} type="text" name="name"/>
        <span className="text-danger">{formErrorMessage.name}</span>
        </div>
        <div className="form-group">
        <label htmlFor="eId">Email Id </label>
        <input type="email" name="emailId" id="eId" placeholder="e.g. rko@gmail.com" onChange={this.handleChange} value={formValue.emailId} className="form-control"/>
        <span className="text-danger">{formErrorMessage.emailId}</span>
        </div>
        <div className="form-group">
        <label htmlFor="dob">Date Of Birth </label>
        <input type="date" name="dateOfBirth" onChange={this.handleChange} value={formValue.dateOfBirth} className="form-control"/>
        <span className="text-danger">{formErrorMessage.dateOfBirth}</span>
        </div>
      
                    <button type = "submit" disabled = {!formValid.buttonActive} className = "btn btn-secondary">Submit</button>
                </form>
                <span className="text-success">{successMessage}</span>
                <span className="text-danger">{errorMessage}</span>

            </div>
        )
    }
}

export default UpdateCustomer;