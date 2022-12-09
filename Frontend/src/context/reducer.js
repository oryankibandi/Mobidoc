import { actions } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_BODY: {
      const { body, user } = action.payload;
      return { ...state, body, user };
    }
    case actions.REGISTER_USER: {
      const { body, newBody } = action.payload;
      return { ...state, user: body, body: newBody };
    }
    case actions.LOGIN_USER: {
      const { token, startLogin } = action.payload;
      return { ...state, token, startLogin };
    }
    case actions.LOGIN_FAIL: {
      const { startLogin } = action.payload;
      return { ...state, startLogin };
    }
    case actions.SET_ERROR: {
      const { err, change } = action.payload;
      return { ...state, [err]: change };
    }
    case actions.LOGOUT_USER: {
      const newBody = { ...state.body, role: null };
      return { ...state, token: "", user: {}, body: newBody };
    }
    case actions.EDIT_DETAILS: {
      const { body } = action.payload;
      return { ...state, body: body, user: body };
    }
    case actions.TOGGLE_DOCTORS_RECORD: {
      const { status, type } = action.payload;
      if (type === "") {
        return {
          ...state,
          viewCreatePatient: status,
          viewDoctors: status,
          viewRecord: status,
        };
      } else {
        return { ...state, [type]: status };
      }
    }
    case actions.SET_OBJECT_DATA: {
      const { data, type } = action.payload
      return { ...state , [type]: data}
    } case actions.UPDATE_PAGE: {
      const { page } = action.payload;
      return { ...state, page };
    }
    case actions.SET_LOADING: {
      const {loading} = action.payload
      return {...state, loading}
    } case actions.UPDATE_REQUESTS: {
      const { requests } = action.payload
      return { ...state, requests };
    }
    case actions.SET_CURRENT_RECORD: {
      const { CurrentRecord } = action.payload;
      return { ...state, CurrentRecord };
    }
    case actions.SET_ACCEPTED_PATIENTS: {
      const { acceptedPatients } = action.payload
      return { ...state, acceptedPatients };
    }
    case actions.SET_CURRENT_EDIT: {
      const { pat } = action.payload;
      return { ...state, patientEDIT: pat };
      }
    default:
      return state;
  }
};
 
export { reducer };
