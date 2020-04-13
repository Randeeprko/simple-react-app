import React from 'react';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import addCustomer from './components/addCustomer'
import getCustomer from './components/getCustomer'
import updateCustomer from './components/updateCustomer'
import deleteCustomer from './components/deleteCustomer'

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
          <Link to = "/addCustomer" className="nav-link" >Add Customers</Link>
        </li>
        <li className="nav-item">
          <Link to = "/getCustomer" className="nav-link">Get Customers</Link>
        </li>
        <li className="nav-item">
          <Link to = "/updateCustomer" className="nav-link">Update Customers</Link>
        </li>
        <li className="nav-item">
          <Link to = "/deleteCustomer" className="nav-link">Delete Customers</Link>
        </li>
    </ul>
     
     
    
    </nav>
    <div>
      <Switch>
    {/*  <Route exact path = "/" render={() => <Redirect to="/myinfo" />}></Route> */} 
     <Route exact path = "/" render = {() => <h3>Hi Welcome to my website</h3>}  />
     <Route path = "/addCustomer" component ={addCustomer} ></Route>
     <Route path = "/getCustomer/:customerId" component={getCustomer}></Route> 
     <Route path = "/updateCustomer/:customerId" component ={updateCustomer} ></Route>
     <Route path = "/deleteCustomer" component={deleteCustomer}></Route>    
      </Switch>
    </div>

  </Router>
  );
}

export default App;
