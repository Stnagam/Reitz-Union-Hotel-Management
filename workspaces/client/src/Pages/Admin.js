import React, { useEffect } from "react";
import Header_Common from "../components/header_common";
import Footer from "../default/footer";
import "../Style/admin.css";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

const Admin = () => {
  const [pendingData, setPendingData] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const [pending, setPending] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [employee, setEmployee] = useState("");
  // const [reqID, setReqID] = useState("");
  let token = localStorage.getItem("token");

  const onClick1 = () => {
    setAssigned(false);
    setCompleted(false);
    setPending(true);
    axios
      .get("http://localhost:8080/auth/pendingReqs", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        // let data = res.json();
        setPendingData(res.data);
        console.log(pendingData);
      });
  };
  // const onClick2 = () => {
  //   setCompleted(false);
  //   setPending(false);
  //   setAssigned(true);
  //   axios
  //     .get("http://localhost:8080/auth/assignedReqs", {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     })
  //     .then((res) => {
  //       setAssignedData(res.data);
  //       console.log(assignedData);
  //     });
  // };
  // const onClick3 = () => {
  //   setPending(false);
  //   setAssigned(false);
  //   setCompleted(true);
  //   axios
  //     .get("http://localhost:8080/auth/completedReqs", {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     })
  //     .then((res) => {
  //       setCompletedData(res.data);
  //       console.log(completedData);
  //     });
  // };

  useEffect(() => {
    setAssigned(false);
    setCompleted(false);
    setPending(true);
    axios
      .get("http://localhost:8080/auth/pendingReqs", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        // let data = res.json();
        setPendingData(res.data);
        console.log(pendingData);
      });
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

  const onAssign = (reqID) => {
    if (validation()) {
      // console.log(employee);
      // console.log(reqID);
      axios.post(
        "http://localhost:8080/auth/assignReqsToEmp",
        {
          requestID: reqID,
          EmployeeID: employee,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      alert("Work is Assigned to " + JSON.stringify({ employee }));
      axios
        .get("http://localhost:8080/auth/pendingReqs", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          setPendingData(res.data);
        });
    }
  };

  // const Completed = (reqID) => {
  //   axios.post(
  //     "http://localhost:8080/auth/markComplete",
  //     {
  //       requestID: reqID,
  //     },
  //     {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     }
  //   );

  //   alert("Work is completed");
  //   axios
  //     .get("http://localhost:8080/auth/assignedReqs", {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     })
  //     .then((res) => {
  //       setAssignedData(res.data);
  //     });
  // };

  // const Deleted = (reqID) => {
  //   axios.post(
  //     "http://localhost:8080/auth/deleteCompleted",
  //     {
  //       requestID: reqID,
  //     },
  //     {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     }
  //   );
  //   alert("Request is deleted from System");
  //   axios
  //     .get("http://localhost:8080/auth/completedReqs", {
  //       headers: {
  //         "x-access-token": token,
  //       },
  //     })
  //     .then((res) => {
  //       setCompletedData(res.data);
  //     });
  // };
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

      {/* <Pending pending={pending} pendingData={pendingData} />
      <Assigned assigned={assigned} assignedData={assignedData} /> */}
      {pending && (
        <div>
          <h3>Pending Request</h3>
          {pendingData.map((pData) => {
            const reqID = pData.requestID;

            return (
              <Card>
                <Card.Header>Request id: {pData.requestID}</Card.Header>
                <Card.Body>
                  Room no: {pData.roomNumber}
                  <Card.Title>Request type: {pData.requestType}</Card.Title>
                  Comment: {pData.comment}
                  <div>Status: Pending</div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setEmployee(e.target.value)}
                      placeholder="Assign employee"
                    />
                    <br />
                    <button
                      className="assign"
                      variant="primary"
                      onClick={() => onAssign(reqID)}
                      style={{
                        "background-color": "#00ab66",
                        "margin-left": "70px",
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
            );
          })}
        </div>
      )}
{/* 
      {assigned && (
        <div>
          <h3>Assigned Request</h3>
          {assignedData.map((pData) => {
            const reqID = pData.requestID;
            return (
              <Card>
                <Card.Header>Request id: {pData.requestID}</Card.Header>
                <Card.Body>
                  Room no: {pData.roomNumber}
                  <Card.Title>Request type: {pData.requestType}</Card.Title>
                  Comment: {pData.comment}
                  <div>Status: Assigned</div>
                  <div>
                    Assigned to: {pData.employeeID}
                    <br />
                    <button
                      onClick={() => Completed(reqID)}
                      style={{
                        "background-color": "Yellow",
                        "margin-left": "70px",
                      }}
                    >
                      Completed
                    </button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}

      {completed && (
        <div>
          <h3>Completed Request</h3>
          {completedData.map((pData) => {
            const reqID = pData.requestID;
            return (
              <Card>
                <Card.Header>RequestID: {reqID}</Card.Header>
                Room no: 101
                <Card.Body>
                  <Card.Title>Request type: Cleaning</Card.Title>
                  cmnt
                  <div>Status: Completed</div>
                  <div>Assigned to: Employee name</div>
                  <button
                    onClick={() => Deleted(reqID)}
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
            );
          })}
        </div>
      )} */}
      <Footer />
    </div>
  );
};

export default Admin;
