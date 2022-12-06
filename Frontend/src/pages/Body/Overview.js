import React from 'react'
import {Main} from "../../css/Body/Overview"
import { stats } from "../../utils/Stats"
import Patients from "../../components/Patients"
import { tableData } from "../../utils/data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Label,
} from "recharts";
const overview = () => {
  const data = [1,2,3,3,4,5]
  return (
    <Main>
      <header>
        <div className="welcome">
          <p className="main">Welcome, Dr Stephen</p>
          <p className="subtitle">Have a nice day at great work</p>
        </div>
        <div className="dark">
          <p>DarkMode</p>
          <input type="checkbox" />
        </div>
      </header>
      <section className="stats">
        {stats.map((item, index) => {
          const { color, text, svg, number, alt_text } = item;
          return (
            <div key={index} style={{ background: `${color}` }}>
              <div>
                <div className="image">
                  <img src={svg} alt={alt_text} />
                </div>
                <p>{number}</p>
              </div>
              <p>{text}</p>
            </div>
          );
        })}
      </section>
      <section className="request-graph">
        <div className="req-cont">
          <header>Patients</header>
          <div className="requests">
            {data.map((item, index) => {
              return (
                <div className="request" key={index}>
                  <div className="details">
                    <p className="title">Dr. Stephen</p>
                    <p>Cardiologist</p>
                  </div>
                  <div className="pending">
                    <button className="accepted">accepted</button>
                  </div>
                </div>
              );
            })}
            <div className="request">
              <div className="details">
                <p className="title">Dr. Stephen</p>
                <p>Cardiologist</p>
              </div>
              <div className="pending">
                <button className="request">request</button>
              </div>
            </div>
          </div>
        </div>
        <div className="table">
          <header>Patients You Diagnosed</header>
          <div className="content">
            <BarChart width={400} height={270} data={tableData}>
              <XAxis dataKey="year" stroke="rgba(0,0,0,.4)">
                <Label
                  value="Days"
                  offset={-20}
                  position="insideBottom"
                  stye={{ color: "rgba(0,0,0,.4)" }}
                />
              </XAxis>
              <YAxis
                stroke="rgba(0,0,0,.4)"
              />
              <Tooltip wrapperStyle={{ width: 150, backgroundColor: "#fff" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 30,
                  backgroundColor: "#fff",
                  border: "1px solid #d5d5d5",
                  borderRadius: 1,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="rgba(0,0,0,.1)" strokeDasharray="5 5" />
              <Bar dataKey="userGain" fill="#8884d8" barSize={20} />
            </BarChart>
          </div>
        </div>
      </section>
      <section className="patient-table">
        <header>Recent Patient</header>
        <div>
          <Patients />
        </div>
      </section>
    </Main>
  );
}

export default overview