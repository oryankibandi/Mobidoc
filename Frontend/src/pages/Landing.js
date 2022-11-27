import {
  MainSection,
  SubSection,
  Button,
  Img,
  Nav,
  Body
} from "../css/Landing.js";
import drawing from "../assets/svg/drawing.svg";
import menu from "../assets/svg/content-white/bars.svg";
import {Link} from 'react-router-dom'

function Landing() {
  return (
    <Body>
      <section className="dropdown-div">
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
          <div className="dropdown">
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
          <Link to="choice"><Button>Get Started</Button></Link>
        </SubSection>
        <div className="image">
          <Img className="position-absolute" src={drawing} alt="An drawing" />
        </div>
      </MainSection>
    </Body>
  );
}

export default Landing;
