import React from "react";
import { Main } from "../css/components/Patients";
import { useGlobally } from "../context/context";


const Patients = () => {
  const { state, getPatientAccess, getPatients } = useGlobally();
  const getAccess = (patient_uid) => {
    getPatientAccess(patient_uid, state.page.patients);
  }
  const updatedPage = (e) => {
    e.preventDefault()
    const { name } = e.target
    getPatients(name);
  }
  return (
    <Main>
      <div>
        
      </div>
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
        {state.patients.data.map((item) => (
          <tr key={item.patient_uid}>
            <td>{`${item.first_name + " " + item.middle_name}`}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>
              {!item.requests.received ? (
                <div className="pending">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      return getAccess(item.patient_uid);
                    }}
                    className="request"
                  >
                    request
                  </button>
                </div>
              ) : (
                <div className="pending">
                  <button className="pending">pending</button>
                </div>
              )}
            </td>
          </tr>
        ))}
        <tr
          style={{
            border: "1px solid rgba(40, 40, 40, .12)",
            borderRadius: "10px",
          }}
        >
          <td>
            <button>{`${
              state.patients.next
                ? Number(state.page.patients) * 10
                : Number(state.page.patients - 1) * 10 +
                  state.patients.data.length
            } of ${state.patients.size}`}</button>
          </td>
          <td colSpan={3}>
            <div>
              {state.patients.previous && (
                <button
                  className=""
                  onClick={(e) => updatedPage(e)}
                  name={state.patients.previous}
                >
                  {state.patients.previous}
                </button>
              )}
              <button
                className="active-page"
                onClick={(e) => updatedPage(e)}
                name={state.page.patients}
              >
                {state.page.patients}
              </button>
              {state.patients.next && (
                <button
                  className=""
                  onClick={(e) => updatedPage(e)}
                  name={state.patients.next}
                >
                  {state.patients.next}
                </button>
              )}
            </div>
          </td>
          <td>
            {state.patients.next ? (
              <button
                onClick={(e) => updatedPage(e)}
                name={state.patients.next}
              >
                Next
              </button>
            ) : (
              <button
                onClick={(e) => updatedPage(e)}
                name={state.patients.previous}
              >
                Previous
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </Main>
  );
};

export default Patients;
