import React,{useEffect} from 'react'
import { useGlobally } from "../../context/context";
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
import spinner from "../../assets/svg/content-dark/spinner.svg";
const Overview = () => {
  const { state, getPatients, setLoading } = useGlobally();
  useEffect(() => {
    setLoading(true);
    getPatients();
    setLoading(false);
  }, [state.user]);
  if (state.loading) {
    return (
      <div className="loading-states">
        <img src={spinner} alt="loading" />
      </div>
    );
  }
  return (
    <Main>
      <div className={`${state.overview_err.type} inform-div`}>
        <p>{state.overview_err.msg}</p>
      </div>
      <header>
        <div className="welcome">
          <p className="main">
            Welcome, Dr. {`${state.body.first_name} ${state.body.last_name}`}
          </p>
          <p className="subtitle">Have a nice day at great work</p>
        </div>
        <div className="dark">
          <p>DarkMode</p>
          <input type="checkbox" />
        </div>
      </header>
      <section className="stats">
        {state.stats.map((item, index) => {
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
            {state.acceptedPatients.length !== 0 ? (
              <>
                {state.acceptedPatients.map((item) => {
                  return (
                    <div className="request" key={item.patient_uid}>
                      <div className="details">
                        <p className="title">{`${
                          item.first_name + " " + item.last_name
                        }`}</p>
                        <p>{item.email}</p>
                      </div>
                      <div className="pending">
                        <button className="accepted">accepted</button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="request">
                <div className="details">
                    <p className="title">
                      No Patients Yet
                      </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="table">
          <header>Patients You Diagnosed</header>
          <div className="content">
            <BarChart width={400} height={270} data={tableData}>
              <XAxis dataKey="month" stroke="rgba(0,0,0,.4)"></XAxis>
              <YAxis stroke="rgba(0,0,0,.4)" />
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
              <Bar dataKey="patients" fill="#8884d8" barSize={20} />
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

export default Overview