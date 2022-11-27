const currentUser =  JSON.parse(localStorage.getItem("user")) || {}
const currentRole = localStorage.getItem("role");
const checkValue = (item, inner = null) => {
  if (currentUser.hasOwnProperty(item)) {
    if (currentUser[item].hasOwnProperty(inner)) {
      return currentUser[item][inner];
    } else {
      return currentUser[item];
    }
  }  return "";
};
const initialState = {
  user: currentUser,
  token: localStorage.getItem("token") || "",
  body: {
    first_name: checkValue("first_name"),
    last_name: checkValue("last_name"),
    middle_name: checkValue("middle_name"),
    national_id: checkValue("national_id"),
    email: checkValue("email"),
    phone_number: checkValue("phone_number"),
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
    place_of_work: checkValue("place_of_work"),
    area_of_specialty: checkValue("area_of_specialty"),
    role: currentRole || "",
  },
};


const actions = {
  UPDATE_BODY: "UPDATE_BODY",
  REGISTER_USER: "REGISTER_USER",
  LOGIN_USER:"LOGIN_USER",
};

export {actions,initialState}