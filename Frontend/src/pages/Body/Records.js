import React, { useEffect, useState } from 'react'

import {Main} from "../../css/Body/Records"
import prev from "../../assets/svg/angle-left.svg"
import next from "../../assets/svg/angle-right.svg"
import accept from "../../assets/svg/Request/tick-1.svg"
import cancel from "../../assets/svg/Request/tick.svg"
import { useGlobally } from "../../context/context"
import noData from "../../assets/svg/undraw_no_data_re_kwbl.svg"
import spinner from "../../assets/svg/content-dark/spinner.svg"
const Records = () => {
  const { state, getRecords, showDoctors, setCurrentRecord, acceptReq, getDoctors,setLoading,
    getRequests} =
    useGlobally();
  const [data, setData] = useState({
    search: "",
    dateFrom: new Date("2022-07-22").toISOString(),
    dateTo: new Date().toISOString(),
  });
  const fetchDoctors = (e) => {
    e.preventDefault();
    showDoctors();
  }
  const setChanges = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    
    if (name === "dateFrom" || name === "dateTo") {
     let newDate = new Date(value).toISOString()
     setData({...data, [name]:newDate})
    } else {
      
      setData({...data, [name]:value})
    }
  }
  const getRecord = (data) => {
    setCurrentRecord(data)
  }
  const acceptRequest = (e) => {
    e.preventDefault();
    const {name} =e.target
    acceptReq({doctor_uid:name})
  }
  const updatedPage = (e) => {
    e.preventDefault();
    const { name } = e.target;
    getRecords(state.user.user_id, state.user.role, name, data);
  };
  useEffect(() => {
    setLoading(true);
    getDoctors();
    getRequests();
    getRecords(state.user.user_id, state.body.role,1, data);
    setLoading(false);
  }, [data]);
  if (state.loading) {
    return (
      <div className="loading-states">
          <img src={spinner} alt="loading"/>
      </div>
    );
  }
  return (
    <Main>
      <div className="main">
        <header className="header">
          <div className="search">
            <input
              type="search"
              placeholder="Search"
              name="search"
              onChange={(e) => setChanges(e)}
              value={data.search}
            />
            <div className="date-search">
              <div>
                <label htmlFor="date-from">From</label>
                <input
                  type="date"
                  placeholder="from"
                  name="dateFrom"
                  onChange={(e) => setChanges(e)}
                  value={data.dateFrom.split("T")[0]}
                />
              </div>
              <div>
                <label htmlFor="date-to">To</label>
                <input
                  type="date"
                  placeholder="to"
                  name="dateTo"
                  value={data.dateTo.split("T")[0]}
                  onChange={(e) => setChanges(e)}
                />
              </div>
            </div>
          </div>
          <div className="dark">
            <p>DarkMode</p>
            <input type="checkbox" />
          </div>
        </header>
        <section>
          <div className={`${state.record_err.type} inform-div`}>
            <p>{state.record_err.msg}</p>
          </div>
          <div className="records">
            <header>
              <p>Records</p>
            </header>
            {state.records.data.length > 0 ? (
              <>
                {state.records.data.map((item, index) => {
                  const time = new Date(item.date).toLocaleDateString();
                  return (
                    <div className="record" key={index}>
                      <div className="title">
                        <p>{item.diagnosis.condition}</p>
                      </div>
                      <div className="body">{item.diagnosis.description}</div>
                      <div className="footer">
                        <p className="date" style={{ fontStyle: "natoMedium" }}>
                          {time}
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            return getRecord(item);
                          }}
                        >
                          view more
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="paginate">
                  <div className="inner-paginate">
                    {state.records.previous && (
                      <img
                        src={prev}
                        alt="previous"
                        name={state.records.previous}
                      />
                    )}
                    {state.records.previous && (
                      <button
                        name={state.records.previous}
                        onClick={(e) => updatedPage(e)}
                      >
                        {state.records.previous}
                      </button>
                    )}
                    <button
                      className="active-btn"
                      name={state.page.records}
                      onClick={(e) => updatedPage(e)}
                    >
                      {state.page.records}
                    </button>
                    {state.records.next && (
                      <button
                        name={state.records.next}
                        onClick={(e) => updatedPage(e)}
                      >
                        {state.records.next}
                      </button>
                    )}
                    {state.records.next && (
                      <img
                        src={next}
                        alt="next"
                        name={state.records.next}
                        onClick={(e) => updatedPage(e)}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-data">
                <img src={noData} alt="no-data" />
                <p>no data</p>
              </div>
            )}
          </div>
          <div className="doctors">
            <header>
              <p>Requests from Doctors</p>
            </header>
            <div className="doctors-div">
              {state.requests && (
                <>
                  {state.requests.length !== 0 ? (
                    <>
                      {state.requests.map((item) => {
                        const time = new Date(item.time).toLocaleDateString();

                        return (
                          <div className="doctor" key={item.doctor.doctor_uid}>
                            <div className="details">
                              <div className="title-div">
                                <p className="title">
                                  Dr.{" "}
                                  {`${item.doctor.first_name} ${item.doctor.last_name}  `}
                                </p>
                                <p>{item.doctor.area_of_specialty}</p>
                              </div>
                              <p>{time}</p>
                            </div>
                            <div className="pending">
                              <img
                                onClick={(e) => acceptRequest(e)}
                                name={item.doctor.doctor_uid}
                                src={accept}
                                alt="accept"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div style={{ textAlign: "center", margin: "1em 0" }}>
                      No Requests Available Yet
                    </div>
                  )}
                </>
              )}
              <div className="view-all" onClick={(e) => fetchDoctors(e)}>
                <button>view all doctors</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
}

export default Records