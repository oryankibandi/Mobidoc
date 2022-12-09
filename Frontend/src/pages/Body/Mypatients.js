import React, { useEffect, useState} from "react";

import { Main } from "../../css/Body/Mypatients";
import prev from "../../assets/svg/angle-left.svg";
import next from "../../assets/svg/angle-right.svg";
import edit from "../../assets/svg/edit.svg";
import { useGlobally } from "../../context/context";
import noData from "../../assets/svg/undraw_no_data_re_kwbl.svg";
import spinner from "../../assets/svg/content-dark/spinner.svg";
const Mypatients = () => {
  const {
    state,
    updateAcceptedPatients,
    showCreatePatients,
    setCurrentRecord,
    getRecords,
    setLoading,
  } = useGlobally();
  const [current, setCurrent] = useState("")
  const changeCurrent = (name) => {
    setCurrent(name)
  }
  const fetchRecords = (id) => {
    getRecords(id, state.user.role);
    changeCurrent(id);
    setLoading(false);
  };
  const showPatients = (id) => {

    showCreatePatients(id)
  }
  const getRecord = (data) => {
    setCurrentRecord(data);
  };
  const updatedPage = (e) => {
    e.preventDefault();
    const { name } = e.target;

    getRecords(name);
  };
  useEffect(() => {
    setLoading(true);
    updateAcceptedPatients();
    setLoading(false);
  }, [current]);
  if (state.loading) {
    return (
      <div className="loading-states">
        <img src={spinner} alt="loading" />
      </div>
    );
  }
  return (
    <Main>
      <div className="main">
        <header className="header">
          <div className="search">
            Check All Patients Details Here
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
              <p>Your Patients</p>
            </header>
            <div className="doctors-div">
              {state.acceptedPatients.length !== 0 ? (
                <>
                  {state.acceptedPatients.map((item) => {
                    return (
                      <div
                        className={`doctor ${
                          current === item.patient_uid ? "active-doc" : ""
                        }`}
                        key={item.patient_uid}
                      >
                        <div
                          className="details"
                          name={item.patient_uid}
                          onClick={() => fetchRecords(item.patient_uid)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="title-div">
                            <p className="title">
                              {`${item.first_name} ${item.last_name}  `}
                            </p>
                          </div>
                          <div className="detail-inner">
                            <p>{item.phone_number}</p>
                            <p>{item.email}</p>
                          </div>
                        </div>
                        <div className="pending">
                          <div
                            className="add"
                            title="add record"
                            onClick={() => showPatients(item.patient_uid)}
                          >
                            <img src={edit} alt="edit" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div style={{ textAlign: "center", margin: "1em 0" }}>
                  No Patients Available Yet
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export default Mypatients;
