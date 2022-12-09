import React, {useState} from "react";
import {
  MainSection,
  SubSection,
  Button,
  Img,
  Nav,
  Body,
  AnotherSection,
  ShortSection,
  Footer,
} from "../css/Landing.js";
import drawing from "../assets/svg/drawing.svg";
import menu from "../assets/svg/content-white/bars.svg";
import about from "../assets/svg/undraw_typewriter_re_u9i2.svg";
import {Link} from 'react-router-dom'
import Player from "react-player/youtube"; 
import Faq from "../components/Faq"
import { data } from "../utils/faq";
import { useRef } from "react";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
 
} from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { social,services } from "../utils/Landing"
function Landing() {
  const aboutSection = useRef()
  const contactSection = useRef();
  const [active,setActive] = useState(false)
  const goAbout = () => {
    aboutSection.current.scrollIntoView({ behavior: "smooth" });
  }
  const goContact = () => {
    contactSection.current.scrollIntoView({ behavior: "smooth" });
  }
  const openDropbar = (e) => {
    e.preventDefault()
    setActive(!active)
  }
  return (
    <Body>
      <section className={`dropdown-div ${active && "active-div"}`}>
        <div
          onClick={(e) => {
            setActive(!active);
            return openDropbar(e);
          }}
        >
          <FaTimes className="times" />
        </div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link
            to="#About"
            onClick={(e) => {
              setActive(!active);
              return goAbout(e);
            }}
          >
            <li>About</li>
          </Link>
          <Link
            to="#Contact"
            onClick={(e) => {
              setActive(!active);
              return goContact(e);
            }}
          >
            <li>Contact</li>
          </Link>
          <Link to="register" onClick={(e) => openDropbar(!e)}>
            <li>Login</li>
          </Link>
        </ul>
      </section>
      <MainSection>
        <Nav>
          <header>Mobidoc</header>
          <li>
            <ul>
              <Link>Home</Link>
            </ul>
            <ul>
              <Link>About</Link>
            </ul>
            <ul>
              <Link>Contact</Link>
            </ul>
            <ul>
              <Link to="register">Login</Link>
            </ul>
          </li>
          <Link to="choice">
            <button>Join us</button>
          </Link>
          <div className="dropdown" onClick={(e) => openDropbar(e)}>
            <img src={menu} alt="menu" />
          </div>
        </Nav>
        <SubSection>
          <p>
            Where patients get quick and easy help from the best professional
            doctors in the world. Moreover, a solution that helps doctors follow
            up with their patients after consultation and keep track of their
            progress.
          </p>
          <Link to="choice">
            <Button>Get Started</Button>
          </Link>
        </SubSection>
        <div className="image">
          <Img className="position-absolute" src={drawing} alt="An drawing" />
        </div>
      </MainSection>
      <AnotherSection>
        <header className="title">Services</header>
        <div className="services">
          {services.map((item) => {
            const { name, icon, text } = item;
            return (
              <div className="service-card">
                <div className="icon">{icon}</div>
                <div className="body">
                  <p className="body-title">{name}</p>
                  <p className="body-here">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </AnotherSection>
      <AnotherSection id="about" ref={aboutSection}>
        <header className="title">About</header>
        <div className="details">
          <p>
            This project was inspired by the covid-19 pandemic which challenged
            some of the best healthcare systems in the world. With the
            challenges faced in accessing medical care, we challenged ourselves
            to come up with a solution to make healthcare more accessible and
            efficient. Mobidoc provides doctors and patients with a platform to
            interact and a robust Electrical Health Record System that ensures
            medical records are stored securely and are accessible from
            anywhere. Mobidoc also serves as our portfolio project for ALX
            Software Engineering program. Our dedicated team has worked hard to
            build the project in order to build an MVP to roll out and test it
            with our first users.
          </p>
          <img src={about} alt="about" />
        </div>
      </AnotherSection>
      <AnotherSection>
        <header className="title">FAQ</header>
        <div className="faq">
          {data.map((item) => {
            return <Faq {...item} />;
          })}
        </div>
      </AnotherSection>
      <ShortSection ref={contactSection}>
        <header class="title">Team</header>
        <div className="links">
          {social.map((item) => {
            const { name, twitter, github, linked } = item;
            return (
              <div className="individial">
                <p>{name}</p>
                <div className="socials">
                  <Link to={twitter}>
                    <AiFillTwitterCircle className="link" />
                  </Link>
                  <Link to={linked}>
                    <AiFillLinkedin className="link" />
                  </Link>
                  <Link to={github}>
                    <AiFillGithub className="link" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </ShortSection>

      <AnotherSection>
        <header className="title">Preview</header>
        <div className="video">
          <Player
            className="video-here"
            url="https://www.youtube.com/embed/GFxe6_2INb8"
            width="100%"
            height="100%"
          />
        </div>
      </AnotherSection>
      <Footer>
        <div className="body">
          <div className="details">
            <header>Company Info</header>
            <ul>
              <Link to="choice">
                <li>Join Us</li>
              </Link>
              <Link to="#about" onClick={goAbout}>
                <li>About Us</li>
              </Link>
            </ul>
          </div>
          <div className="details">
            <header>Get In touch</header>
            <ul>
              <Link to="https://github.com/oryankibandi/Mobidoc">
                <li>Source Code</li>
              </Link>
            </ul>
          </div>

          <div className="newsletter">
            <header>Newsletter</header>
            <div className="input-newsletter">
              <input type="email" placeholder="Enter Email" />
              <input type="submit" />
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Copyright @ 2022 | MOBIDOC</p>
        </div>
      </Footer>
    </Body>
  );
}

export default Landing;
