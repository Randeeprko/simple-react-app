import React from 'react';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import AddCustomer from './components/addCustomer'
import GetCustomer from './components/getCustomer'
import UpdateCustomer from './components/updateCustomer'
import DeleteCustomer from './components/deleteCustomer'
import ViewCustomers from './components/viewCustomers'
function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <span className="navbar-brand">RKO Portal</span>
    <ul className ="navbar-nav">
        <li className="nav-item">
          <Link to = {'/'} className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to = "/addCustomer" className="nav-link" >Add Customer</Link>
        </li>
        <li className="nav-item">
          <Link to = "/getCustomer" className="nav-link">Get Customer</Link>
        </li>
        <li className="nav-item">
          <Link to = "/updateCustomer" className="nav-link">Update Customer</Link>
        </li>
        <li className="nav-item">
          <Link to = "/deleteCustomer" className="nav-link">Delete Customer</Link>
        </li>
        <li className="nav-item">
          <Link to = "/viewCustomers" className="nav-link">View Customers</Link>
        </li>
    </ul>
     
     
    
    </nav>
    <div>
      <Switch>
    {/*  <Route exact path = "/" render={() => <Redirect to="/myinfo" />}></Route> */} 
     <Route exact path = "/" render = {() => <h3>Hi Welcome to my website</h3>}  />
     <Route path = "/addCustomer" component ={AddCustomer} ></Route>
     <Route path = "/getCustomer/:customerId" component={GetCustomer}></Route> 
     <Route path = "/updateCustomer/:customerId" component ={UpdateCustomer} ></Route>
     <Route path = "/deleteCustomer/:customerId" component={DeleteCustomer}></Route>    
     <Route path = "/viewCustomers" component={ViewCustomers}></Route>    
      </Switch>
    </div>

  </Router>
  );
}

export default App;
