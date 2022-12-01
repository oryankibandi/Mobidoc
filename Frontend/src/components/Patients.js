import React from "react";
import { Main } from "../css/components/Patients";
import accept from "../assets/svg/Request/tick-1.svg";
import cancel from "../assets/svg/Request/tick.svg";

const Patients = () => {
  return (
    <Main>
      <thead
        style={{
          borderLeftRadius: "50px",
        }}
      >
        <tr
          style={{
            border: "1px solid rgba(40, 40, 40, .12)",
            borderLeftRadius: "50px",
          }}
        >
          <th
            style={{
              borderLeftRadius: "50px",
            }}
          >
            Name
          </th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone No</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Kinuthia</td>
          <td>kibet</td>
          <td>john@gmail.com</td>
          <td>0712452234</td>
          <td>
            <div className="pending">
              <button className="accepted">accepted</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>John Kinuthia</td>
          <td>kibet</td>
          <td>john@gmail.com</td>
          <td>0712452234</td>
          <td>
            <div className="pending">
              <button className="request">request</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>John Kinuthia</td>
          <td>kibet</td>
          <td>john@gmail.com</td>
          <td>0712452234</td>
          <td>
            <div className="pending">
              <button className="pending">pending</button>
            </div>
          </td>
        </tr>
        <tr
          style={{
            border: "1px solid rgba(40, 40, 40, .12)",
            borderRadius: "10px",
          }}
        >
          <td>
            <button>Previous</button>
          </td>
          <td colSpan={3}>
            <div>
              <button>1</button>
              <button className="active-page">2</button>
              <button>1</button>
              <button>1</button>
              <button>1</button>
              <button>1</button>
              <button>1</button>
            </div>
          </td>
          <td>
            <button>Next</button>
          </td>
        </tr>
      </tbody>
    </Main>
  );
};

export default Patients;
