import React,{Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const getUrl = "http://localhost:5565/rkobank/customers/";
class GetCustomer extends Component {
    constructor(props){
        super(props);
        this.state = {
            customerData : {},
            errorMessage : "could not fetch data",
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
         this.setState({customerData:response.data, errorMessage: ''})
     }).catch((error) => {
        if(error.response){
            this.setState({errorMessage:error.response.data.message,successMessage:''})
            console.table([error.response])
          }
          else
            this.setState({errorMessage:"Could not fetch customers data",successMessage:''})
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
                                 { Object.keys(customerData).length ? 
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
                                            <tr key = {this.state.customerData.customerId} >
                                             <td>{this.state.customerData.customerId}</td>
                                             <td>{this.state.customerData.name}</td>
                            
                                             <td>{this.state.customerData.emailId}</td>
                                             <td>{this.state.customerData.dateOfBirth}</td>
                                            </tr>
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

export default withRouter(GetCustomer);