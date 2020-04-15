import React,{Component} from 'react'
import axios from 'axios'

const getUrl = "http://localhost:5565/rkobank/customers";
class ViewCustomers extends Component {
    constructor(props){
        super(props);
        this.state = {
            customerData : [],
            errorMessage : "could not fetch data",
            successMessage : ""
        }
    }

    componentDidMount(){
        this.fetchCustomer();
    }
    
    fetchCustomer = () => {
        axios.get(getUrl)
     .then((response) => {
         console.table([response.data]);
         this.setState({customerData:response.data, errorMessage: ''})
     }).catch((error) => {
        if(error.response){
            this.setState({errorMessage:error.response.data.message,successMessage:''})
            console.table([error.response])
          }
          else
            this.setState({errorMessage:"Could not fetch booking data",successMessage:''})
     })
    }
    render(){
        const{customerData} = this.state
        return(
            <div className = "container">
                 <div className ="row">
                     <div className ="col-md-9 offset-md-2">
                         <div className="card">
                             <div className="card-header bg custom">
        <h3 align="center" className="text-primary">Customers Details</h3>
                             </div>
                             <div className = "card-body">
                                 { customerData ? 
                                       <table className="table table-hover table-striped">
                                           <thead>
                                               <tr>
                                                   <th>Customer Id</th>
                                                   <th>Name</th>
                                                   <th>Email Id</th>
                                                   <th>Date Of Birth</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               {
                                                   customerData.map(item => {
                                                       return(
                                                        <tr key = {item.customerId} >
                                                        <td>{item.customerId}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.emailId}</td>
                                                        <td>{item.dateOfBirth}</td>
                                                        </tr>
                                                       ) 
                                                   })
                                               }
                                            
                                           </tbody>
                                       </table>
                                    :<div className="text-danger text-center">{this.state.errorMessage}</div>  }
                             </div>
                           </div>
                       </div>
                   </div>    
               </div>
        );    
    }     
}

export default ViewCustomers