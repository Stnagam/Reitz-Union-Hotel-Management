import React, { useEffect } from "react";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
import "../Style/admin.css";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const Admin = () => {
  const [pending, setPending] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [employee, setEmployee] = useState("");

  const onClick1 = () => {
    setAssigned(false);
    setCompleted(false);
    setPending(true);
  };
  const onClick2 = () => {
    setCompleted(false);
    setPending(false);
    setAssigned(true);
  };
  const onClick3 = () => {
    setPending(false);
    setAssigned(false);
    setCompleted(true);
  };

  useEffect(() => {
    setAssigned(false);
    setCompleted(false);
    setPending(true);
  }, []);

  const [errors, seterrors] = useState([]);

  const validation = () => {
    let errors = {};
    let formIsValid = true;

    if (!employee) {
      formIsValid = false;
      errors["employee"] = "Employee should be assigned";
    }
    seterrors(errors);
    return formIsValid;
  };
  const onClick = () => {
    if (validation()) {
      alert("Work is Assigned to " + { employee });
    }
  };

  const Completed = () => {
    alert("Work is completed");
  };

  const Deleted = () => {
    alert("Request is delted from System");
  };
  return (
    <div className="admin">
      <Header_Common />
      <div className="navbar">
        <button className="button" onClick={onClick1}>
          Pending Request
        </button>
        <button className="button" onClick={onClick2}>
          Assigned Request
        </button>
        <button className="button" onClick={onClick3}>
          Completed Request
        </button>
      </div>

      {pending && (
        <div>
          <h3>Pending Request</h3>
          <Card>
            <Card.Header>Room no: 101</Card.Header>
            <Card.Body>
              <Card.Title>Request type: Cleaning</Card.Title>
              cmnt
              <div>Status: Pending</div>
              <div>
                <input
                  type="text"
                  onChange={(e) => setEmployee(e.target.value)}
                  placeholder="Assign employee"
                />
                <br/>
                <button
                  className="assign"
                  variant="primary"
                  onClick={onClick}
                  style={{
                    "background-color": "#00ab66",
                    "margin-left": "30px",
                  }}
                >
                  Assign work
                </button>
                <br />
                <span style={{ color: "red", fontSize: "15px" }}>
                  {errors["employee"]}
                </span>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
      {assigned && (
        <div>
          <h3>Assigned Request</h3>
          <Card>
            <Card.Header>Room no: 101</Card.Header>
            <Card.Body>
              <Card.Title>Request type: Cleaning</Card.Title>
              cmnt
              <div>Status: Assigned</div>
              <div>
                Assigned to: Employee name
                <br />
                <button
                  onClick={Completed}
                  style={{
                    "background-color": "#00ab66",
                    "margin-left": "70px",
                  }}
                >
                  Completed
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
      {completed && (
        <div>
          <h3>Completed Request</h3>
          <Card>
            <Card.Header>Room no: 101</Card.Header>
            <Card.Body>
              <Card.Title>Request type: Cleaning</Card.Title>
              cmnt
              <div>Status: Completed</div>
              <div>Assigned to: Employee name</div>
              <button
                onClick={Deleted}
                style={{
                  "background-color": "Red",
                  color: "white",
                  "margin-left": "70px",
                }}
              >
                Delete
              </button>
            </Card.Body>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Admin;
