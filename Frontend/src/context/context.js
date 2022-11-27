import React, { useContext, useReducer } from "react";
import { initialState, actions } from "./actions"
import { reducer } from "./reducer"
import axios from "axios"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //axios defaults
  const client = axios.create({
    baseURL: "https://mobidoc.iankibandi.tech/",
  });
  const updateMainBody = (body) => {
        dispatch({
          type: actions.UPDATE_BODY,
          payload: { body },
        });
  }
  const registerUser = async (body)=>{
    dispatch({
      type: actions.REGISTER_USER,
      payload:{body}
    })
    try{
      const data = await client.post("patient/create/", state.user);
      console.log(data)
    }catch (error){
      console.log(error)
    }
  }
  const login = async (body) => {
    try {
      const { data } = await client.post("patient/login/", state.user);
      const {access_token} = data.data;
      localStorage.setItem("token", access_token);
      dispatch({
        type: actions.LOGIN_USER,
        payload: { body },
      });
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <AppContext.Provider value={{ state, updateMainBody, registerUser,login }}>
        {children}
      </AppContext.Provider>
    );
}
const useGlobally = ()=>{
    return useContext(AppContext)
}
export { AppProvider, useGlobally }
