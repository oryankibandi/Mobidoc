import React from "react";
import { Main } from "../css/components/Patients";
import { useGlobally } from "../context/context";


const Doctors = () => {
  const { state, getDoctors} = useGlobally();
  const updatedPage = (e) => {
    e.preventDefault();
    const { name } = e.target;
    getDoctors(name);
  };
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
        {state.doctors.data.map((item) => (
          <tr key={item.doctor.doctor_uid}>
            <td>{`${item.doctor.first_name + " " + item.doctor.last_name}`}</td>
            <td>{item.doctor.username}</td>
            <td>{item.doctor.email}</td>
            <td>{item.doctor.national_id}</td>
            <td>
              {item.has_access ? (
                <div className="pending">
                  <button className="accepted">accepted</button>
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
              state.doctors.next
                ? Number(state.page.doctors) * 10
                : Number(state.page.doctors - 1) * 10 +
                  state.doctors.data.length
            } of ${state.doctors.size}`}</button>
          </td>
          <td colSpan={3}>
            <div>
              {state.doctors.previous && (
                <button
                  className=""
                  onClick={(e) => updatedPage(e)}
                  name={state.doctors.previous}
                >
                  {state.doctors.previous}
                </button>
              )}
              <button
                className="active-page"
                onClick={(e) => updatedPage(e)}
                name={state.page.doctors}
              >
                {state.page.doctors}
              </button>
              {state.doctors.next && (
                <button
                  className=""
                  onClick={(e) => updatedPage(e)}
                  name={state.doctors.next}
                >
                  {state.doctors.next}
                </button>
              )}
            </div>
          </td>
          <td>
            {state.doctors.next ? (
              <button onClick={(e) => updatedPage(e)} name={state.doctors.next}>
                Next
              </button>
            ) : (
              <button
                onClick={(e) => updatedPage(e)}
                name={state.doctors.previous}
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

export default Doctors;