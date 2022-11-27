import { actions } from "./actions";
const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_BODY: {
      const { body } = action.payload;
      const {
        first_name,
        last_name,
        middle_name,
        national_id,
        email,
        phone_number,
        address_country,
        address_county,
        address_city,
        address_street,
        role,
      } = body;
      localStorage.setItem("role", role);
      if (role === "doctor") {
        let newBody = {
          first_name,
          last_name,
          national_id,
          email,
          address: {
            country: address_country,
            county: address_county,
            city: address_city,
            street:address_street,
          },
        };
        let Data =  {...state.body, role}
        localStorage.setItem("user", JSON.stringify(newBody));
        return { ...state, body: Data, user: newBody };
      } else {
        let newBody = {
          first_name,
          last_name,
          middle_name,
          phone_number,
          national_id,
          email,
          address: {
            country: address_country,
            county: address_county,
            city:address_city,
            street:address_street,
          },
        };
        let Data = { ...state.body, role };
        localStorage.setItem("user", JSON.stringify(newBody));
        return { ...state, body:Data, user: newBody};
      }
    }
    case actions.REGISTER_USER: {
      const { body } = action.payload;
      const {
        next_of_kin_first_name,
        next_of_kin_last_name,
        next_of_kin_middle_name,
        next_of_kin_phone_number,
        next_of_kin_relationship,
        username,
        place_of_work,
        area_of_specialty,
        password,
      } = body;
      if (state.role === "doctor") {
        let newBody = {
          ...state.user,
          username,
          place_of_work,
          area_of_specialty,
        };

        localStorage.setItem("user", JSON.stringify(newBody));
        return { ...state, user: newBody };
      } else {
        let newBody = {
          ...state.user,
          next_of_kin: {
            first_name: next_of_kin_first_name,
            last_name: next_of_kin_last_name,
            middle_name: next_of_kin_middle_name,
            phone_number: next_of_kin_phone_number,
            relationship:next_of_kin_relationship,
          },
        };

        localStorage.setItem("user", JSON.stringify(newBody));
        newBody["password"] = password;
        return { ...state, user: newBody };
      }
    }
    case actions.LOGIN_USER: {
      const {token} = action.payload
      return { ...state, token };
    }
    default:
      return state;
  }
};

export { reducer };
