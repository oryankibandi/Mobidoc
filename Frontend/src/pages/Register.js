import React, { useState } from 'react'
import { Main } from '../css/Register'
import { useGlobally } from "../context/context"
import {  Link} from "react-router-dom";
import {CheckRegistration, CheckLogin} from "../utils/Register"

const Register = () => {
  const { state, registerUser, login, updateError} = useGlobally();
  const [body, setBody] = useState(state.body)
  const [loginData, setLoginData] = useState({password:"",email:"", role:"", phone_number:""})
  const changeBody = (e) => {
    e.preventDefault()
    const { name,value } = e.target;
    setBody({...body, [name]:value})
  }
  const changeLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }
  const submitData = (e) => {
    e.preventDefault();
    const { next_of_kin_first_name,
      next_of_kin_last_name,
      next_of_kin_middle_name,
      next_of_kin_relationship,
      next_of_kin_phone_number,
      phone_number,
      retype_password,
      username,
      password,
      place_of_work,
      area_of_specialty, role } = body;
    
    const registrationData = (role === "patient") ?{
      ...state.user,
      next_of_kin: {
            first_name: next_of_kin_first_name,
            last_name: next_of_kin_last_name,
            middle_name: next_of_kin_middle_name,
            phone_number: next_of_kin_phone_number,
            relationship:next_of_kin_relationship,
      },
      password,
      role
    }:{...state.user,
          username,
          place_of_work,
          area_of_specialty,
          password,
          role
        };
    if (CheckRegistration(
      next_of_kin_first_name,
      next_of_kin_last_name,
      next_of_kin_middle_name,
      next_of_kin_relationship,
      next_of_kin_phone_number,
      phone_number,
      retype_password,
      username,
      password,
      place_of_work,
      area_of_specialty,
      role,
      updateError
    )){
      return;
    }
    registerUser(registrationData);
  };
  const loginUser = async (e)=>{
    e.preventDefault();
    const { phone_number, email, password, role } = loginData 
    const login_data =
      role === "patient"
        ? { phone_number, password,role }
        : { email, password,role };
    if (CheckLogin(phone_number, email, password, role, updateError)) {
      return;
    }
    login(login_data)
  }
  return (
    <Main>
      <section className="login">
        <header>Log in</header>

        <form onSubmit={(e) => loginUser(e)}>
          <div
            className={`${
              state.login_err.status ? "active-error-div" : ""
            } error-div`}
          >
            <p
              className={`${state.login_err.type === "warning" ? "error" : ""}`}
            >
              {state.login_err.msg}
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={loginData.phone_number}
              name="phone_number"
              onChange={(e) => changeLogin(e)}
              required
            ></input>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email@gmail.com"
              name="email"
              onChange={(e) => changeLogin(e)}
              value={loginData.email}
              required
            ></input>
          </div>
          <div>
            <select
              name="role"
              onChange={(e) => changeLogin(e)}
              value={loginData.role}
            >
              <option value="" disabled>
                What Are Logging in as?
              </option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <div className="last-div">
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              name="password"
              onChange={(e) => changeLogin(e)}
              required
            ></input>
          </div>
          <div>
            <input type="submit" value="login"></input>
          </div>
        </form>
      </section>
      <section className="register">
        <header>Register</header>
        <form onSubmit={(e) => submitData(e)}>
          <div
            className={`${
              state.register_err.status ? "active-error-div" : ""
            } error-div`}
          >
            <p
              className={`${
                state.register_err.type === "warning" ? "error" : ""
              }`}
            >
              {state.register_err.msg}
            </p>
          </div>
          {body.role === "" && (
            <>
              <div className="active-error-div error-div">
                <p className="error">Sorry, cannot sign up go back</p>
              </div>
            </>
          )}
          {body.role === "patient" ? (
            <>
              <div className="header">
                <p>Next of Kin details</p>
              </div>
              <div className="first-div">
                <input
                  type="text"
                  className="first-input"
                  value={body.next_of_kin_first_name}
                  name="next_of_kin_first_name"
                  onChange={(e) => changeBody(e)}
                  placeholder="First name"
                  required
                ></input>
                <input
                  type="text"
                  value={body.next_of_kin_middle_name}
                  name="next_of_kin_middle_name"
                  onChange={(e) => changeBody(e)}
                  placeholder="Middle name"
                  required
                ></input>
                <input
                  type="text"
                  value={body.next_of_kin_last_name}
                  name="next_of_kin_last_name"
                  onChange={(e) => changeBody(e)}
                  placeholder="Last name"
                  required
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  value={body.next_of_kin_phone_number}
                  name="next_of_kin_phone_number"
                  onChange={(e) => changeBody(e)}
                  placeholder="Phonenumber"
                  required
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  value={body.next_of_kin_relationship}
                  name="next_of_kin_relationship"
                  onChange={(e) => changeBody(e)}
                  placeholder="Relationship"
                  required
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  value={body.password}
                  name="password"
                  onChange={(e) => changeBody(e)}
                  placeholder="Password"
                  required
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  value={body.retype_password}
                  name="retype_password"
                  onChange={(e) => changeBody(e)}
                  placeholder="RetypePassword"
                  required
                ></input>
              </div>
              {body.role === "" || (
                <div className="submit-div">
                  <input type="submit" value="Register"></input>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <input
                  type="text"
                  value={body.username}
                  name="username"
                  onChange={(e) => changeBody(e)}
                  placeholder="Username"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  value={body.place_of_work}
                  name="place_of_work"
                  onChange={(e) => changeBody(e)}
                  placeholder="Place of work"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Area of specialty"
                  value={body.area_of_specialty}
                  name="area_of_specialty"
                  onChange={(e) => changeBody(e)}
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  value={body.password}
                  name="password"
                  onChange={(e) => changeBody(e)}
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  value={body.retype_password}
                  name="retype_password"
                  onChange={(e) => changeBody(e)}
                  placeholder="RetypePassword"
                ></input>
              </div>
              {body.role === "" || (
                <div className="submit-div">
                  <input type="submit" value="Register"></input>
                </div>
              )}
            </>
          )}
          <div className="go-back">
            Made an error
            <Link to="/choice">go back</Link>
          </div>
        </form>
      </section>
    </Main>
  );
}

export default Register