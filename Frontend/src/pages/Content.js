import React, {useState} from 'react'
import {Main, Sidebar, Body} from '../css/Content'
import { profile, record, overview, message, signout, menu } from "../assets/svg/Content";
import {
  profileLight,
  recordLight,
  overviewLight,
  messageLight,
} from "../assets/svg/ContentLight";
import { Outlet,Navigate,NavLink } from "react-router-dom"
import Doctor from "../components/Doctors"
import Record from "../components/Record";
import times from "../assets/svg/content-white/times.svg";
import {useGlobally} from "../context/context"
const Content = () => {
  const { state,logout } = useGlobally();
  if (state.token === "") {
    return <Navigate to="/register"/>
  }
  const logoutUser = (e) => {
    e.preventDefault();
    logout();
  }
  return (
    <Main>
      <div className="doctors-popup">
        <img className="cancel-popup" src={times} alt="cancel" />
        <Record />
      </div>
      <Sidebar>
        <header>Mobidoc</header>
        <li>
          <ul name="overview">
            <NavLink
              to="/overview"
              className={({ isActive }) => (isActive ? "active-ul" : "")}
            >
              <div className="overview"></div>
              <p>Overview</p>
            </NavLink>
          </ul>
          <ul name="profile">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-ul" : "")}
            >
              <div className="profile"></div>
              <p>Profile</p>
            </NavLink>
          </ul>
          <ul name="message">
            <NavLink
              to="/message"
              className={({ isActive }) => (isActive ? "active-ul" : "")}
            >
              <div className="message"></div>
              <p>Message</p>
            </NavLink>
          </ul>
          <ul name="record">
            <NavLink
              to="/records"
              className={({ isActive }) => (isActive ? "active-ul" : "")}
            >
              <div className="record"></div>
              <p>Reports</p>
            </NavLink>
          </ul>
        </li>
        <div onClick={(e) => logoutUser(e)}>
          <img src={signout} alt="log out" />
          <p>Log out</p>
        </div>
      </Sidebar>
      <Body>
        <div className="menu">
          <img src={menu} alt="menu" />
        </div>
        <Outlet />
      </Body>
    </Main>
  );
}

export default Content