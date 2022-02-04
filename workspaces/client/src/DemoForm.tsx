import React from 'react';

import './demoform.css';
  
class DemoForm extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {}
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
     
  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input = {};
        input["firstname"] = "";
        input["lastname"] = "";
        input["email"] = "";
        input["password"] = "";
        input["confirm_password"] = "";
        input["age"] = "";
        input["contact_number"] = "";
        this.setState({input:input});
        // console.log(input["firstname"]);
        alert('Demo Form is submitted');
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   
      if (!input["firstname"]) {
        isValid = false;
        errors["firstname"] = "Please enter your firstname.";
      }
  
      // if (typeof input["firstname"] !== "undefined") {
      //   const re = /^\S*$/;
      //   if(input["firstname"].length < 6 || !re.test(input["firstname"])){
      //       isValid = false;
      //       errors["firstname"] = "Please enter valid firstname.";
      //   }
      // }

      if (!input["lastname"]) {
        isValid = false;
        errors["lastname"] = "Please enter your lastname.";
      }
  
      // if (typeof input["lastname"] !== "undefined") {
      //   const re = /^\S*$/;
      //   if(input["lastname"].length < 6 || !re.test(input["lastname"])){
      //       isValid = false;
      //       errors["lastname"] = "Please enter valid lastname.";
      //   }
      // }
  
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof input["email"] !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
        }
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }

      if (!input["age"]) {
        isValid = false;
          errors["age"] = "Please enter your age.";
      }

      if (typeof input["age"] !== "undefined") {
        if(input["age"]< 15 || input["age"] > 120){
            isValid = false;
            errors["age"] = "Please enter age between 15 to 120.";
        }
      }


      if (!input["contact_number"]) {
        isValid = false;
          errors["contact_number"] = "Please enter contact number.";
      }
      

      if (typeof input["contact_number"] !== "undefined") {
        var phoneno = /^\d{10}$/;
        if (!phoneno.test(input["contact_number"])) {
          isValid = false;
          errors["contact_number"] = "Please enter valid Contact number.";
        }
      }
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      
      <div>
        
        <form onSubmit={this.handleSubmit}>
  
          <div class="firstname">
            <label for="firstName">Firstname:</label>
            <input 
              type="text" 
              name="firstname" 
              value={this.state.input.firstname}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter First name" 
              id="firstname" />
  
              <div className="text-danger">{this.state.errors.firstname}</div>
          </div>

          <div class="lastname">
            <label for="lastname">Lastname:</label>
            <input 
              type="text" 
              name="lastname" 
              value={this.state.input.lastname}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter Last name" 
              id="lastname" />
  
              <div className="text-danger">{this.state.errors.lastname}</div>
          </div>
  
  
          <div class="email">
            <label for="email">Email Address:</label>
            <input 
              type="text" 
              name="email" 
              value={this.state.input.email}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter email" 
              id="email" />
  
              <div className="text-danger">{this.state.errors.email}</div>
          </div>
  
          <div class="password">
            <label for="password">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.input.password}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter password" 
              id="password" />
  
              <div className="text-danger">{this.state.errors.password}</div>
          </div>
  
          <div class="confirm_password">
            <label for="confirm_password">Confirm Password:</label>
            <input 
              type="password" 
              name="confirm_password" 
              value={this.state.input.confirm_password}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter confirm password" 
              id="confirm_password" />
  
              <div className="text-danger">{this.state.errors.confirm_password}</div>
          </div>

          <div class="age">
            <label for="age">Age:</label>
            <input 
              type="text" 
              name="age" 
              value={this.state.input.age}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter your age" 
              id="age" />
  
              <div className="text-danger">{this.state.errors.age}</div>
          </div>

          <div class="contact_number">
            <label for="contactnumber">Contact Number:</label>
            <input 
              type="text" 
              name="contact_number" 
              value={this.state.input.contact_number}
              onChange={this.handleChange}
              class="form-control" 
              placeholder="Enter Contact number" 
              id="contact_number" />
  
              <div className="text-danger">{this.state.errors.contact_number}</div>
          </div>
             
          <input classname="submit" type="submit" value="Sign up" class="btn btn-success" />
        </form>
      </div>
    );
  }
}
  
export default DemoForm;
