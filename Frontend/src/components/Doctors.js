import React from 'react'
import accept from "../assets/svg/Request/tick-1.svg";
import cancel from "../assets/svg/Request/tick.svg";
import { Main } from "../css/components/Doctors"

const Doctors = () => {
  return (
    <Main>
      <thead>
        <tr>
          <th>Name</th>
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
              <img src={accept} alt="accept" />
              <img src={cancel} alt="cancel" />
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
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
      </tfoot>
    </Main>
  );
}

export default Doctors