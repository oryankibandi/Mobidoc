import React from 'react'
import {Main} from "../../css/Body/Records"
import prev from "../../assets/svg/angle-left.svg"
import next from "../../assets/svg/angle-right.svg"
import accept from "../../assets/svg/Request/tick-1.svg"
import cancel from "../../assets/svg/Request/tick.svg"
const Records = () => {
  const data = [1,2,3]
  return (
    <Main>
      <div className="main">
        <header className="header">
          <div className="search">
            <input type="search" placeholder="Search" />
            <div>
              <label for="date">From</label>
              <input type="date" name="date" />
            </div>
            <div>
              <label for="date">To</label>
              <input type="date" name="date" />
            </div>
          </div>
          <div className="dark">
            <p>DarkMode</p>
            <input type="checkbox" />
          </div>
        </header>
        <section>
          <div className="records">
            <header>
              <p>Records</p>
            </header>
            {data.map((item) => {
              return (
                <div className="record">
                  <div className="title">
                    <p>List group item heading</p>
                    <p className="date">Thursady, 12/21/2022</p>
                  </div>
                  <div className="body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    nulla hic id iure aperiam aliquid? Sunt nemo commodi fuga,
                    rem eaque incidunt accusantium cumque voluptates eveniet
                    dolorem quasi nam minima?
                  </div>
                  <div className="footer">
                    <p>By Dr. Stephen</p>
                    <button>view more</button>
                  </div>
                </div>
              );
            })}
            <div className="paginate">
              <div className="inner-paginate">
                <img className="active-btn" src={prev} alt="previous" />
                {data.map((item) => {
                  return <button>{item}</button>;
                })}
                <img src={next} alt="next" />
              </div>
            </div>
          </div>
          <div className="doctors">
            <header>
              <p>Available Doctors</p>
            </header>
            <div className="doctors-div">
              {data.map((item) => {
                return (
                  <div className="doctor">
                    <div className="details">
                      <p className="title">Dr. Stephen</p>
                      <p>Cardiologist</p>
                    </div>
                    <div className="pending">
                      <img src={accept} alt="accept" />
                      <img src={cancel} alt="cancel" />
                    </div>
                  </div>
                );
              })}
              <div className="doctor">
                <div className="details">
                  <p className="title">Dr. Stephen</p>
                  <p>Cardiologist</p>
                </div>
                <div className="pending">
                  <button className="accepted">accepted</button>
                </div>
              </div>
              <div className="doctor">
                <div className="details">
                  <p className="title">Dr. Stephen</p>
                  <p>Cardiologist</p>
                </div>
                <div className="pending">
                  <button className="declined">declined</button>
                </div>
              </div>
              <div className='view-all'>
                <button>view all</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
}

export default Records