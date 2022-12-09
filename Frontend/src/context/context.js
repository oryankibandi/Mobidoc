import React, { useContext, useReducer } from "react";
import { actions } from "./actions"
import { reducer } from "./reducer"
import { stats } from "../utils/Stats";
import { parseBody, getBody} from "./Operations";
import axios from "axios"


const currentUser = JSON.parse(localStorage.getItem("user")) || null;
const currentRole = localStorage.getItem("role");
const stat = stats.map(
  (item) => {
    Object.entries({ "Total Patients": 1234, "Currently Monitoring": 123, "Recently Added": 123, "Previously Assisted": 300 }).forEach(
      (value) => {
        if (item.text === value[0]) {
          item["number"] = value[1];
        }
      }
    );
    return item
  }
)
const patientPage = localStorage.getItem("patientPage") || 1;
const initialState = {
  user: currentUser,
  token: localStorage.getItem("token") || null,
  body: getBody(currentUser, currentRole),
  choice_err: { status: false, msg: "", type: "warning" },
  register_err: { status: false, msg: "", type: "warning" },
  login_err: { status: false, msg: "", type: "warning" },
  edit_err: { status: false, msg: "", type: "" },
  record_err: { status: false, msg: "", type: "" },
  viewDoctors: false,
  viewRecord: false,
  startLogin: false,
  records: { data: [], size: 0, next: null, prev: null },
  doctors: { data: [], size: 0, next: null, prev: null },
  stats: stat,
  patients: JSON.parse(localStorage.getItem(`patients_${patientPage}`)) || {
    data: [],
    size: 0,
    next: null,
    prev: null,
  },
  page: { patients: 1, records: 1, doctors: 1 },
  loading: false,
  requests: [],
  CurrentRecord: JSON.parse(localStorage.getItem("currentRecord")) || [],
  acceptedPatients: [],
  overview_err: { status: false, msg: "", type: "" },
  viewCreatePatient: false,
  patientEDIT: localStorage.getItem("patientEDIT") || "",
  recordData: {}
};


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //axios defaults
  const client = axios.create({
    baseURL: "https://mobidoc.iankibandi.tech/",
    headers: {
      Authorization: `Bearer ${state.token}`,
    }
  });
  //interceptors
  client.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  });

  const updateMainBody = (body) => {
    dispatch({
      type: actions.UPDATE_BODY,
      payload: { body, user: parseBody(body) },
    });
  }
  const registerUser = async (body) => {
    console.log(body)
    try {
      const url = `${body.role}/create`;
      const { data } = await client.post(url, body);
      body[`user_id`] = data.data[`${body.role}_uid`];
      delete body.password;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(body));
      let newBody = getBody(body, state.body.role)
      dispatch({
        type: actions.REGISTER_USER,
        payload: { body, newBody },
      });
      updateError(
        "register_err",
        "",
        true,
        "You are successfully registered"
      );
    } catch (error) {
      console.log(error)
      updateError("register_err", "warning", true, getError(error));
    }
  }
  const setLoading = (status) => {
    dispatch({ 
      type: actions.SET_LOADING,
      payload: {loading:status}
    })
  }
  const login = async (body) => {
    setLoading(true)
    const { role } = body
    dispatch({
      type: actions.LOGIN_FAIL,
      payload: { startLogin: true },
    });
    try {
      const url = `${role}/login`;
      const { data } = await client.post(url, body);
      const { access_token } = data.data;
      const newBody = { role, user_id: data.data.user[`${role}_uid`], }
      getUser(newBody, access_token);
      updateError(
        "login_err",
        "",
        true,
        "Successfully Logged in.Redirecting..."
      );
      dispatch({
        type: actions.LOGIN_USER,
        payload: { token: access_token, startLogin: false },
      });
      localStorage.setItem("role", role);
      localStorage.setItem("token", access_token);
      setLoading(false)
    } catch (error) {
      dispatch({
        type: actions.LOGIN_FAIL,
        payload: { startLogin: false },
      });
      console.log(error);
      updateError("login_err", "warning", true, getError(error));
    }
  }
  const getUser = async (body, token = state.token) => {
    const { user_id, role } = body;
    const config={
      headers: {
      Authorization: `Bearer ${token}`,
    }
    }
    try {
      const url = `${role}s/${user_id}`
      const { data } = await client.get(url, config);
      data.data = {
        ...data.data,
        role,
        user_id
      }
      delete data.data[`${role}_uid`]
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch({
        type: actions.UPDATE_BODY,
        payload: { body: getBody(data.data, role), user: data.data },
      });
    } catch (error) {
      logout()
    }
  }
  const logout = async (role) => {
    // try {
    //   await client.post(`${role}/logout/`);
    dispatch({
      type: actions.LOGOUT_USER,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    cancelPopup();
    updateError("login_err", "warning", true, "You were Logged out");
    // } catch (error) {
    //   console.log(error)
    //   updateError("edit_err", "warning", true, getError(error));
    // }
  }
  const updateError = (err, type = "", status = false, msg = "") => {
    const change = { type, status, msg }
    const changeDefault = { type: "", status: false, msg: "" };
    dispatch({
      type: actions.SET_ERROR,
      payload: { err, change },
    });
    return setTimeout(
      () =>
        dispatch({
          type: actions.SET_ERROR,
          payload: { err, change: changeDefault },
        }),
      3000
    );
  }
  const editDetails = async (body) => {
    const { role, user_id } = body
    try {
      const user = parseBody(body);
      const url = `${role}/${user_id}`;
      await client.put(url, user);
      getUser(body)
      updateError("edit_err", "success", true, "successfully edited");
    } catch (error) {
      console.log(error);
      updateError("edit_err", "warning", true, getError(error));
    }
  }
  const getRecords = async (
    user_id,
    role,
    page = 1,
    dataFilter = {
      search: "",
      dateFrom: new Date("2022-07-22").toUTCString(),
      dateTo: new Date().toUTCString(),
    }
  ) => {
    const dateFrom = new Date(dataFilter.dateFrom).toISOString()
    const dateTo = new Date(dataFilter.dateTo).toISOString();
    let url = `records?patient_uid=${user_id}&count=5&page=${page}&from=${dateFrom}&to=${dateTo}`;
    try {
      const { data } = await client.get(url);
      
      dispatch({
        type: actions.SET_OBJECT_DATA,
        payload: { data: setObjectData(data.data), type: "records" },
      });
      updatePage("records", page);
    } catch (error) {
      console.log(error);
      updateError(
        "record_err",
        "warning",
        true,
        getError(error) || "Error occurred"
      );
    }
  };
  const getSingleRecord = async (user_id, record_id) => {
    ///records/:patient_uid/:record_uid
    try {
      const { data } = await client.get(`records/${user_id}/${record_id}`)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRequests = async () => {
    try {
      const { data } = await client.get("medfiles/requests/")
      
      dispatch({
        type: actions.UPDATE_REQUESTS,
        payload: { requests: data.data },
      });
    } catch (error) {
      console.log(error)
    }
  }
  const acceptReq = async(body)=>{
    try {
      const { data } = await client.post('/medfiles/grant',body)
      updateError(
        "record_err",
        "success",
        true,
        data.data
      );
    } catch (error) {
      console.log(error)
    }
  }
  const getDoctors = async (page=1) => {
    try {
      //doctors/?count&page&first_name&place_of_work&area_of_specialty/
      const { data } = await client.get(`doctors?page=${page}`);
      // console.log(data.data)
      dispatch({
        type: actions.SET_OBJECT_DATA,
        payload: { data: setObjectData(data.data), type: "doctors" }
      });
      updatePage("doctors", page);
    } catch (error) {
      updateError(
        "record_err",
        "warning",
        true,
        getError(error)
      );
      console.log(error);
    }
  }
  const showDoctors = async () => {
    cancelPopup()
    dispatch({
      type: actions.TOGGLE_DOCTORS_RECORD,
      payload: { status: true, type: "viewDoctors" },
    });
  }
  const showCreatePatients = (pat) => {
    cancelPopup();
    localStorage.setItem("patientEDIT", pat);
    dispatch({
      type: actions.SET_CURRENT_EDIT,
      payload: { pat },
    });
    dispatch({
      type: actions.TOGGLE_DOCTORS_RECORD,
      payload: { status: true, type: "viewCreatePatient" },
    });
  };
  const cancelPopup = () => {
    dispatch({
      type: actions.TOGGLE_DOCTORS_RECORD,
      payload: { status: false, type: "" },
    });
  }
  const getPatients = async (page=1) => {
      try {
        const url = `/patients?count=5&page=${page}`;
        const { data } = await client.get(url);
        const patients = setObjectData(data.data);
        //console.log(data)
        getAcceptedPatients(patients, page);
      } catch (error) {
        console.log(error);
      }
  }
  const setObjectData = (data) => {
    //console.log(data)
    return {
      data: data.results ?data.results:[],
      size: data.total ? data.total : 0,
      next: data.next ? data.next : null,
      previous: data.previous ? data.previous : null,
    };
  }
  const addData = (patients, accepted, page = 1) => {
    const data = { sent: false, received: false };
    patients = JSON.parse(localStorage.getItem(`patients_${page}`)) || patients 
    updatePage("patients", page);
    let newObject = patients.data
    if (accepted.length !== 0) {
      accepted.forEach((main) => {
        newObject.forEach((item) => {
          if (item.patient_uid === main.patient_uid) {
            item["requests"] = { sent: false,received:true };
          } else {
            item["requests"] = data;
          }
        });
      });
    } else {
      newObject.forEach((item) => {
          item["requests"] = data;
      });
    }
    const newPatients = { ...patients, data: newObject };
    localStorage.setItem("patientPage", page);
    localStorage.setItem(`patients_${page}`, JSON.stringify(newPatients));
    return newPatients;
  }
  const getPatientAccess = async(patient_uid) => {
    try {
      await client.post("/medfiles/request", { patient_uid });
      updateRequest("sent", true, patient_uid);
      updateError("overview_err","success",true,"Request sent");
    } catch (error) {
      console.log(error)
      updateError("overview_err", "warning", true, getError(error));
    }
  }
  const updateRequest = ( status, data, patient_uid) => {
    const newPatient = state.patients.data.map(
      (item) => {
        if (item.patient_uid === patient_uid) {
          item["requests"] = {...item["requests"],[status]: data };
        }
        return item
      }
    )
    console.log(newPatient)
    const newData = { ...state.patients, data: newPatient }
    localStorage.setItem("patientPage", state.page.patients);
    localStorage.setItem(
      `patients_${state.page.patients}`,
      JSON.stringify(newData)
    );
    dispatch({
      type: actions.SET_OBJECT_DATA,
      payload: { data: newData, type: "patients" },
    });
    
  }
  const updatePage = (type, data) => {
    const page = {...state.page,[type]:data}
    dispatch({
      type: actions.UPDATE_PAGE,
      payload:{page}
    });
  }
  const setCurrentRecord = (data) => {
    localStorage.setItem("currentRecord", JSON.stringify(data))
    dispatch({
      type:actions.SET_CURRENT_RECORD,
      payload:{CurrentRecord:data}
    })
    cancelPopup();
    dispatch({
      type: actions.TOGGLE_DOCTORS_RECORD,
      payload: { status: true, type: "viewRecord" },
    });
  }
  const getAcceptedPatients = async (patients = state.patients, patientsPage=1) => {
    updateAcceptedPatients()
      dispatch({
        type: actions.SET_OBJECT_DATA,
        payload: {
          data: addData(patients, state.acceptedPatients, patientsPage),
          type: "patients",
        },
      });
  };
  const updateAcceptedPatients = async () => {
    try {
      const { data } = await client.get("medfiles/paired");
      dispatch({
        type: actions.SET_ACCEPTED_PATIENTS,
        payload: { acceptedPatients: data.data },
      });
    } catch (error) {
      console.log(error);
    }
  }
  const getError = (error)=>{
    if (error.response) {
      if (error.response.hasOwnProperty("data")) {
        return error.response.data.message;
      }return error.message
    } else if (error.request) {
      if (error.request.hasOwnProperty("data")) { return "Oops! Error occurred from our end" }
      return error.message
    } else {
      return error.message;
    }
  }
  const addRecord = async (body, patient_id, size) => {
    body = changeRecord(body, patient_id, size);
    try {
      const { data } = await client.post("record/add", body);
      console.log(data)
      dispatch({
        type: actions.TOGGLE_DOCTORS_RECORD,
        payload: { status: false, type: "viewCreatePatient" },
      });
    } catch (error) {
      console.log(error); 
    }
  };
  const changeRecord = (rec, id,size) => {
    let newRecord = {};
    newRecord["patient_uid"] = id?id:state.patientEDIT;
    let symptoms = [];
    let medication = [];
    for (let i = 0; i < size; i++){
      medication.push({})
    }
    let diagnosis = {}
    Object.entries(rec).forEach((item) => {
      if (item[0].slice(0,10) === "medication") {
        if (item[0].slice(11,17) === "dosage") {
            medication[Number(item[0].slice(18))]["dosage"] = item[1];
        } else {
          medication[Number(item[0].slice(16))]["name"] = item[1];
        }
      }else if (item[0].slice(0,7) === "symptom") {
        symptoms.push(item[1]);
      }
      else {
        diagnosis[item[0]] = item[1];
      }
    });
    newRecord["symptoms"] = symptoms;
    newRecord["diagnosis"] = diagnosis;
    newRecord["medication"] = medication;
    return newRecord;
  }
    return (
      <AppContext.Provider
        value={{
          state,
          updateMainBody,
          registerUser,
          login,
          updateError,
          logout,
          editDetails,
          getRecords,
          getDoctors,
          cancelPopup,
          getSingleRecord,
          showDoctors,
          getPatients,
          getPatientAccess,
          updatePage,
          getUser,
          acceptReq,
          getRequests,
          setCurrentRecord,
          getAcceptedPatients,
          updateAcceptedPatients,
          setLoading,
          showCreatePatients,
          addRecord,
        }}
      >
        {children}
      </AppContext.Provider>
    );
}
const useGlobally = ()=>{
    return useContext(AppContext)
}
export { AppProvider, useGlobally }
