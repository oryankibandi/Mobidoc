import React, { useContext, useEffect, useReducer } from "react";
import { actions } from "./actions"
import { reducer } from "./reducer"
import {parseBody} from "./Operations"
import axios from "axios"

const currentUser = JSON.parse(localStorage.getItem("user")) || {};
const currentRole = localStorage.getItem("role");
const checkValue = (item, inner = null) => {
  if (currentUser.hasOwnProperty(item)) {
    if (currentUser[item].hasOwnProperty(inner)) {
      return currentUser[item][inner];
    } else if (inner === "county") {
      return "";
    } else {
      return currentUser[item];
    }
  }
  return "";
};
const initialState = {
  user: currentUser,
  token: localStorage.getItem("token"),
  body: {
    first_name: checkValue("first_name"),
    last_name: checkValue("last_name"),
    middle_name: checkValue("middle_name"),
    national_id: checkValue("national_id"),
    email: checkValue("email"),
    phone_number: checkValue("phone_number"),
    username: checkValue("username"),
    address_country: checkValue("address", "country"),
    address_county: checkValue("address", "county"),
    address_city: checkValue("address", "city"),
    address_street: checkValue("address", "street"),
    next_of_kin_first_name: checkValue("next_of_kin", "first_name"),
    next_of_kin_last_name: checkValue("next_of_kin", "last_name"),
    next_of_kin_middle_name: checkValue("next_of_kin", "middle_name"),
    next_of_kin_relationship: checkValue("next_of_kin", "relationship"),
    next_of_kin_phone_number: checkValue("next_of_kin", "phone_number"),
    password: "",
    retype_password: "",
    place_of_work: checkValue("place_of_work"),
    area_of_specialty: checkValue("area_of_specialty"),
    role: currentRole || "",
  },
  choice_err: { status: false, msg: "", type: "warning" },
  register_err: { status: false, msg: "", type: "warning" },
  login_err: { status: false, msg: "", type: "warning" },
  edit_err: { status: false, msg: "", type: "" },
};


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //axios defaults
  const client = axios.create({
    baseURL: "https://mobidoc.iankibandi.tech/",
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
   //interceptors
  client.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      if (error.response.status === 401) {
        logout();
    }
      return Promise.reject(error);
    }
  );
  const updateMainBody = (body) => {
        dispatch({
          type: actions.UPDATE_BODY,
          payload: { body },
        });
  }
  const registerUser = async (body)=>{
    try {
      const url = (state.body.role === "patient") ? "patient/create/" : "doctor/create/";
      const { data } = await client.post(url, body);
      body[`user_id`] = data.data[`${body.role}_uid`];
      // 36512 doctor
      body.role = (data.data.role).toString()
      console.log(data.data)
      dispatch({
        type: actions.REGISTER_USER,
        payload: { body },
      });
       updateError(
        "register_err",
        "",
        true,
        "You are successfully registered"
      );
    }catch (error){
      console.log(error)
      updateError("register_err", "warning", true, getError(error));
    }
  }
  const login = async (body) => {
    const {role} = body
    try {
      let newBody = {}
      const url = (role === "patient") ? "patient/login/" : "doctor/login/";
      const { data } = await client.post(url, body);
      const { access_token } = data.data;
      newBody = { role,user_id:data.data.user[`${role}_uid`]}
      dispatch({
        type: actions.LOGIN_USER,
        payload: { body:newBody,token:access_token },
      });
      localStorage.setItem("token", access_token);
      getUser(newBody, access_token);
      updateError("login_err", "", true, "Successfully Logged in");
    } catch (error) {
            console.log(error);
      updateError("login_err", "warning", true, getError(error));
      return false
    }
  }
  const getUser = async(body,token) => {
    const { user_id, role } = body;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url =
        role === "patient" ? `patients/${user_id}/` : `doctors/${user_id}/`;
      const { data } = await client.get(url,config);
      console.log(data)
      dispatch({
        type: actions.UPDATE_USER,
        payload: { body: data.data, role }
      });
    } catch (error) {
      console.log(getError(error))
      logout()
    }
  }
  const logout = () => {
    dispatch({
      type:actions.LOGOUT_USER
    })
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    localStorage.removeItem("token")
  }
  const updateError = (err,type,status,msg)=>{
    dispatch({
      type: actions.SET_ERROR,
      payload: { err, change:{ type, status, msg } },
    })
    return setTimeout(
      ()=>dispatch({
      type: actions.SET_ERROR,
      payload: { err, change:{ type:"", status:false, msg:"" } },
    })
      ,3000
    )
  }
  const editDetails = async(body) => {
    const { role } = body
    const {user_id} = state.user
    try {
      const url =
        role === "patient" ? `patient/${user_id}/` : `doctor/${user_id}/`;
      await client.put(url, parseBody(body));
      dispatch({
        type: actions.EDIT_DETAILS,
        payload: { body },
      });
      updateError("edit_err", "success", true, "successfully edited");
    } catch (error) {
      console.log(error);
      updateError("edit_err", "warning", true, getError(error));
    }
  }
  
  const getError = (error)=>{
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.hasOwnProperty("data")) {
        return error.response.data.message;
      }
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (error.request.hasOwnProperty("data")) { return "Oops! Error occurred from our end" }
      return error.message
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
    // console.log(error.config);
  }
  useEffect(() => { 
    getUser(state.user,state.token);
  }, []);
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
