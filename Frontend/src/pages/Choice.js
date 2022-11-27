import React, { useState } from 'react'
import { Main } from "../css/Choice"
import doctors from "../assets/svg/undraw_doctors_re_8ou9.svg"
import { Link } from "react-router-dom"
import { useGlobally } from '../context/context'
const Choice = () => {
    const { state,updateMainBody } = useGlobally()
  const [body, setBody] = useState(state.body)
    const updateBody = (e) => {
        const { value,name } = e.target
        setBody({...body, [name]:value})
    }
  const updateMain = (e) => {
      e.preventDefault()
      updateMainBody(body)
      
    }
  return (
    <Main>
      <form onSubmit={(e) => updateMain(e)}>
        <header>Glad You Could Join Us</header>
        <div className="error-div">
          <p className="">Error occured</p>
        </div>
        <div className="first-div">
          <input
            type="text"
            className="first-input"
            placeholder="First name"
            name="first_name"
            onChange={(e) => updateBody(e)}
            value={body.first_name}
            required
          ></input>
          <input
            type="text"
            placeholder="Middle Name"
            name="middle_name"
            onChange={(e) => updateBody(e)}
            value={body.middle_name}
            required
          ></input>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={(e) => updateBody(e)}
            value={body.last_name}
            required
          ></input>
        </div>
        <div>
          <select
            name="role"
            onChange={(e) => updateBody(e)}
            value={body.role}
            required
          >
            <option value="" disabled required>
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
            required
          ></input>
        </div>
        <div>
          <input
            type="number"
            minLength={13}
            min={70000000}
            placeholder="Phonenumber(starts with 7)"
            name="phone_number"
            onChange={(e) => updateBody(e)}
            value={body.phone_number}
            required
          ></input>
        </div>
        <div>
          <input
            type="number"
            min={0}
            placeholder="National-id"
            name="national_id"
            onChange={(e) => updateBody(e)}
            value={body.national_id}
            required
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Country"
            name="address_country"
            onChange={(e) => updateBody(e)}
            value={body.address_country}
            required
          ></input>
          <input
            type="text"
            placeholder="City"
            name="address_city"
            onChange={(e) => updateBody(e)}
            value={body.address_city}
            required
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="County"
            name="address_county"
            onChange={(e) => updateBody(e)}
            value={body.address_county}
            required
          ></input>
          <input
            type="text"
            placeholder="Street"
            name="address_street"
            onChange={(e) => updateBody(e)}
            value={body.address_street}
            required
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