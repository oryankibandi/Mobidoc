import { actions } from "./actions";
import { parseBody, getChoice, updatedBody } from "./Operations";
const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_BODY: {
      const { body } = action.payload;
      const { role } = body;
      localStorage.setItem("role", role);
      let newBody = getChoice(body);
      let Data = { ...state.body, role };
      localStorage.setItem("user", JSON.stringify(newBody));
      return { ...state, body: Data, user: newBody };
    }
    case actions.REGISTER_USER: {
      const { body } = action.payload;
      let newBody = {
        ...body,
      };
      delete newBody.password;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newBody));
      return { ...state, user: body };
    }
    case actions.LOGIN_USER: {
      const { token,body } = action.payload;
      localStorage.setItem("user", JSON.stringify(body));
      localStorage.setItem("role", body.role);
      return { ...state, token, user: body };
    }
    case actions.SET_ERROR: {
      const { err, change } = action.payload;
      const { type, status, msg } = change;
      return { ...state, [err]: { type, status, msg } };
    }
    case actions.LOGOUT_USER: {
      const newBody = { ...state.body, role: "" };
      return { ...state, token: "", user: {}, body: newBody };
    }
    case actions.EDIT_DETAILS: {
      const { body } = action.payload;
      const newBody = parseBody(body);
      localStorage.setItem("role", body.role);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newBody));
      return { ...state, body: body, user: body };
    }
    case actions.UPDATE_USER: {
      const { body,role} = action.payload;
      let newUser = {
        ...body,
        role
      }
      let newBody = updatedBody(body, role)
      newUser = { ...newUser, ...state.user }
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("role", role);
      return { ...state, user: newUser, body: newBody };
    }
    default:
      return state;
  }
};
 
export { reducer };
