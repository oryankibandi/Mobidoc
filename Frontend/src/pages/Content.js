import React from 'react'
import {Main, Sidebar, Body} from '../css/Content'
import { profile, record, overview, message, signout, menu } from "../assets/svg/Content";
import {
  profileLight,
  recordLight,
  overviewLight,
  messageLight,
} from "../assets/svg/ContentLight";
import { Outlet } from "react-router-dom"
import Doctor from "../components/Doctors"
import Record from "../components/Record";
import times from "../assets/svg/content-white/times.svg";
const Content = () => {
  return (
    <Main>
      <div className="doctors-popup">
        <img className="cancel-popup" src={times} alt="cancel" />
        <Record />
      </div>
      <Sidebar>
        <header>Mobidoc</header>
        <li>
          <ul className="active-ul">
            <img src={overviewLight} alt="overview" />
            <p>Overview</p>
          </ul>
          <ul>
            <img src={profile} alt="profile" />
            <p>Profile</p>
          </ul>
          <ul>
            <img src={message} alt="message" />
            <p>Message</p>
          </ul>
          <ul>
            <img src={record} alt="record" />
            <p>Reports</p>
          </ul>
        </li>
        <div>
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