import React from 'react';




  
class DemoForm extends React.Component {
  anythis: any;
  constructor(props : any) {
    super(props);
    this.anythis = {
      input: {},
      errors: {}
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event: any) {
    const input = this.anythis.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
     
  handleSubmit(event:any) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input:any = {};
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
      let input = this.anythis.input;
      let errors:any = {};
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
  
          <div className="firstname">
            <label htmlFor="firstName">Firstname:</label>
            <input 
              type="text" 
              name="firstname" 
              value={this.anythis.input.firstname}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter First name" 
              id="firstname" />
  
              <div className="text-danger">{this.anythis.errors.firstname}</div>
          </div>

          <div className="lastname">
            <label htmlFor="lastname">Lastname:</label>
            <input 
              type="text" 
              name="lastname" 
              value={this.anythis.input.lastname}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter Last name" 
              id="lastname" />
  
              <div className="text-danger">{this.anythis.errors.lastname}</div>
          </div>
  
  
          <div className="email">
            <label htmlFor="email">Email Address:</label>
            <input 
              type="text" 
              name="email" 
              value={this.anythis.input.email}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter email" 
              id="email" />
  
              <div className="text-danger">{this.anythis.errors.email}</div>
          </div>
  
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={this.anythis.input.password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter password" 
              id="password" />
  
              <div className="text-danger">{this.anythis.errors.password}</div>
          </div>
  
          <div className="confirm_password">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input 
              type="password" 
              name="confirm_password" 
              value={this.anythis.input.confirm_password}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter confirm password" 
              id="confirm_password" />
  
              <div className="text-danger">{this.anythis.errors.confirm_password}</div>
          </div>

          <div className="age">
            <label htmlFor="age">Age:</label>
            <input 
              type="text" 
              name="age" 
              value={this.anythis.input.age}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter your age" 
              id="age" />
  
              <div className="text-danger">{this.anythis.errors.age}</div>
          </div>

          <div className="contact_number">
            <label htmlFor="contactnumber">Contact Number:</label>
            <input 
              type="text" 
              name="contact_number" 
              value={this.anythis.input.contact_number}
              onChange={this.handleChange}
              className="form-control" 
              placeholder="Enter Contact number" 
              id="contact_number" />
  
              <div className="text-danger">{this.anythis.errors.contact_number}</div>
          </div>
             
          <input className="submit" type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}
  
export default DemoForm;
