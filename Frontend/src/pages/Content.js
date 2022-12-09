import React, {useState} from 'react'
import { Main, Sidebar, Body } from '../css/Content'
import CreatePatient from '../components/CreatePatient';
import {signout, menu } from "../assets/svg/Content";

import { Outlet,NavLink,Navigate } from "react-router-dom"
import Doctors from "../components/Doctors"
import Record from "../components/Record";
import times from "../assets/svg/content-white/times.svg";
import {useGlobally} from "../context/context"
const Content = () => {
  const { state, logout, cancelPopup } = useGlobally();
  const [openSidebar,setOpenSidebar] = useState(false)
  const changeToggle = (e) => {
    e.preventDefault();
    cancelPopup()
  }
  const changePopup = (e) => {
    e.preventDefault()
    setOpenSidebar(!openSidebar);
  }
  const logoutUser = (e) => {
    e.preventDefault();
    logout(state.body.role);
  }
  if (!state.token || !state.user) {
    return <Navigate to="/register" />;
  }
  return (
    <Main>
      <div
        className={`${
          (state.viewRecord || state.viewDoctors || state.viewCreatePatient) &&
          "active-popup"
        } doctors-popup`}
      >
        <img
          className="cancel-popup"
          src={times}
          alt="cancel"
          onClick={(e) => changeToggle(e)}
        />
        {state.viewDoctors && <Doctors />}
        {state.viewRecord && <Record />}
        {state.viewCreatePatient && <CreatePatient />}
      </div>
      {openSidebar || (
        <Sidebar>
          <header>Mobidoc</header>
          <li>
            {state.user.role === "doctor" && (
              <ul name="overview">
                <NavLink
                  to={`/${state.user.user_id}/overview`}
                  className={({ isActive }) => (isActive ? "active-ul" : "")}
                >
                  <div className="overview"></div>
                  <p>Overview</p>
                </NavLink>
              </ul>
            )}
            <ul name="profile">
              <NavLink
                to={`/${state.user.user_id}/`}
                className={({ isActive }) => (isActive ? "active-ul" : "")}
              >
                <div className="profile"></div>
                <p>Profile</p>
              </NavLink>
            </ul>
            {state.user.role === "doctor" && (
              <ul name="Mypatients">
                <NavLink
                  to={`/${state.user.user_id}/patients`}
                  className={({ isActive }) => (isActive ? "active-ul" : "")}
                >
                  <div className="message"></div>
                  <p>Patients</p>
                </NavLink>
              </ul>
            )}
            {state.user.role === "patient" && (
              <ul name="record">
                <NavLink
                  to={`/${state.user.user_id}/records`}
                  className={({ isActive }) => (isActive ? "active-ul" : "")}
                >
                  <div className="record"></div>
                  <p>Reports</p>
                </NavLink>
              </ul>
            )}
          </li>
          <div onClick={(e) => logoutUser(e)}>
            <img src={signout} alt="log out" />
            <p>Log out</p>
          </div>
        </Sidebar>
      )}
      <Body className={`${openSidebar && "active-full"}`}>
        <div className="menu">
          <img src={menu} alt="menu" onClick={(e) => changePopup(e)} />
        </div>
        <Outlet />
      </Body>
    </Main>
  );
}

export default Content