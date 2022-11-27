import React, { useState } from 'react'
import { Main } from '../css/Register'
import { useGlobally } from "../context/context"

const Register = () => {
  const { state, registerUser, login} = useGlobally();
  const [body, setBody] = useState(state.body)
  const submitData = (e) => {
    e.preventDefault()
    registerUser(body)
  }
  const changeBody = (e) => {
    const { name,value } = e.target;
    setBody({...body, [name]:value})
  }
  const loginUser = (e)=>{
    e.preventDefault();
    login(body);
  }
  return (
    <Main>
      <section className="login">
        <header>Log in</header>
        <form onSubmit={(e) => loginUser(e)}>
          {body.role === "patient" ? (
            <div>
              <input
                type="text"
                placeholder="Phonenumber"
                value={body.phone_number}
                name="phone_number"
                onChange={(e) => changeBody(e)}
                required
              ></input>
            </div>
          ) : (
            <div>
              <input
                type="email"
                placeholder="Email@gmail.com"
                name="email"
                onChange={(e) => changeBody(e)}
                value={body.email}
                required
              ></input>
            </div>
          )}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={body.password}
              name="password"
              onChange={(e) => changeBody(e)}
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
              <div>
                <input type="submit" value="Register"></input>
              </div>
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
                  required
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  value={body.place_of_work}
                  name="place_of_work"
                  onChange={(e) => changeBody(e)}
                  placeholder="Place of work"
                  required
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Area of specialty"
                  value={body.area_of_specialty}
                  name="area_of_specialty"
                  onChange={(e) => changeBody(e)}
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
              <div>
                <input type="submit" value="Register"></input>
              </div>
            </>
          )}
        </form>
      </section>
    </Main>
  );
}

export default Register