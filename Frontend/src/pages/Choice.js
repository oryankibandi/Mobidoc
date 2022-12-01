import React, { useState } from 'react'
import { Main } from "../css/Choice"
import doctors from "../assets/svg/undraw_doctors_re_8ou9.svg"
import { Link, useNavigate} from "react-router-dom"
import { useGlobally } from '../context/context'
import  {CheckValidity} from "../utils/Choice"
const Choice = () => {
  const { state, updateMainBody,updateError} = useGlobally()
  const [body, setBody] = useState(state.body)
  let navigate = useNavigate()
    const updateBody = (e) => {
        const { value,name } = e.target
        setBody({...body, [name]:value})
    }
  const updateMain = (e) => {
    e.preventDefault()
    
const {
  first_name,
  last_name,
  middle_name,
  national_id,
  email,
  phone_number,
  address_country,
  address_county,
  address_city,
  address_street,
  role,
    } = body;
   if ( CheckValidity(first_name,
  last_name,
  middle_name,
  national_id,
  email,
  phone_number,
  address_country,
  address_county,
  address_city,
  address_street,
     role, updateError)) {
     return;
  }
    updateMainBody(body);
    updateError(
      "choice_err",
      "",
      true,
      "Redirecting..."
    );
    return setTimeout(()=>navigate("/register"),3000); 
    }
  return (
    <Main>
      <form onSubmit={(e) => updateMain(e)}>
        <header>Glad You Could Join Us</header>
        <div
          className={`${
            state.choice_err.status ? "active-error-div" : ""
          } error-div`}
        >
          <p
            className={`${state.choice_err.type === "warning" ? "error" : ""}`}
          >
            {state.choice_err.msg}
          </p>
        </div>
        <div className="first-div">
          <input
            type="text"
            className="first-input"
            placeholder="First name"
            name="first_name"
            onChange={(e) => updateBody(e)}
            value={body.first_name}
          ></input>
          <input
            type="text"
            placeholder="Middle Name"
            name="middle_name"
            onChange={(e) => updateBody(e)}
            value={body.middle_name}
          ></input>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={(e) => updateBody(e)}
            value={body.last_name}
          ></input>
        </div>
        <div>
          <select name="role" onChange={(e) => updateBody(e)} value={body.role}>
            <option value="" disabled>
              What Are Logging in as?
            </option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <div>
          <input
            type="email"
            placeholder="Email@gmail.com"
            name="email"
            onChange={(e) => updateBody(e)}
            value={body.email}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Phonenumber(+2547***)"
            name="phone_number"
            onChange={(e) => updateBody(e)}
            value={body.phone_number}
          ></input>
        </div>
        <div>
          <input
            type="number"
            min={0}
            placeholder="National Id"
            name="national_id"
            onChange={(e) => updateBody(e)}
            value={body.national_id}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Country"
            name="address_country"
            onChange={(e) => updateBody(e)}
            value={body.address_country}
          ></input>
          <input
            type="text"
            placeholder="City"
            name="address_city"
            onChange={(e) => updateBody(e)}
            value={body.address_city}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="County"
            name="address_county"
            onChange={(e) => updateBody(e)}
            value={body.address_county}
          ></input>
          <input
            type="text"
            placeholder="Street"
            name="address_street"
            onChange={(e) => updateBody(e)}
            value={body.address_street}
          ></input>
        </div>
        <div style={{ cursor: "pointer" }}>
          <input type="submit" value="Next"></input>
        </div>
        <div className="goto">
          <p>
            Already have an account <Link to="/register">Log in</Link>
          </p>
        </div>
      </form>
      <div className="image">
        <img style={{ height: "400px" }} src={doctors} alt="doctors" />
      </div>
    </Main>
  );
}

export default Choice