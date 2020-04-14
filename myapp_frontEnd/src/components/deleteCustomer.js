import React,{Component} from 'react'
import axios from 'axios'
class deleteCustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
             customerId : this.props.match.params.customerId,
              errorMessage : "",
              successMessage : ""
            }
        }     

        componentDidMount(){
            this.submitBooking()
        }
    
        submitBooking = () => {
            var{customerId} = this.state
             axios.delete('http://localhost:5565/rkobank/customers/'+customerId)
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
        const{successMessage,errorMessage} = this.state
        return(
            <div className  = "container">
            <span className="text-success text-center">{successMessage}</span>
            <span className="text-danger text-center">{errorMessage}</span>
        </div>
        );
    }
}

export default deleteCustomer;