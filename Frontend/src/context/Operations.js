import axios from "axios";
const base_url = "https://mobidoc.iankibandi.tech/";
export const getLogin = (url, body) => axios.post(`${base_url}${url}`, body);
export const updatedBody = (body, role) => {
  return role === "patient"
    ? {
        last_name: body.last_name,
        first_name: body.first_name,
        middle_name: body.middle_name,
        national_id: body.national_id,
        email: body.email,
        phone_number: body.phone_number,
        address_country: body.address.country,
        address_county: body.address.county,
        address_city: body.address.city,
        address_street: body.address.street,
        next_of_kin_first_name: body.next_of_kin.first_name,
        next_of_kin_last_name: body.next_of_kin.last_name,
        next_of_kin_middle_name: body.next_of_kin.middle_name,
        next_of_kin_relationship: body.next_of_kin.relationship,
        next_of_kin_phone_number: body.next_of_kin.phone_number,
        role: role ? role : "",
      }
    : {
        last_name: body.last_name,
        first_name: body.first_name,
        national_id: body.national_id,
        email: body.email,
        address_country: body.address.country,
        address_city: body.address.city,
        address_street: body.address.street,
        username: body.username,
        place_of_work: body.place_of_work,
        area_of_specialty: body.area_of_specialty,
        role: role ? role : "",
      };
};
export const parseBody = (body) => {
  const items = Object.entries(body);
  let newBody = {
    first_name: "",
    last_name: "",
    middle_name: "",
    national_id: "",
    email: "",
    phone_number: "",
    address: {
      country: "",
      county: "",
      city: "",
      street: "",
    },
    next_of_kin: {
      first_name: "",
      last_name: "",
      middle_name: "",
      phone_number: "",
      relationship: "",
    },
    username: "",
    place_of_work: "",
    area_of_specialty: "",
    password: "",
  };
  const keys = [
    "next_of_kin_first_name",
    "next_of_kin_last_name",
    "next_of_kin_middle_name",
    "next_of_kin_relationship",
    "next_of_kin_phone_number",
    "phone_number",
    "username",
    "password",
    "place_of_work",
    "area_of_specialty",
    "first_name",
    "last_name",
    "middle_name",
    "national_id",
    "email",
    "phone_number",
    "address_country",
    "address_county",
    "address_city",
    "address_street",
  ];
  items.forEach((item) => {
    if (keys.includes(item[0])) {
      if (item[0].startsWith("address")) {
        newBody["address"][`${item[0].slice(8)}`] = item[1];
      } else {
        if (item[0].startsWith("next_of_kin")) {
          newBody["next_of_kin"][`${item[0].slice(12)}`] = item[1];
        } else {
          newBody[`${item[0]}`] = item[1];
        }
      }
    }
  });
  return newBody;
};
export const getBody = (data = {}, role = null) => {
  let newBody = {
    next_of_kin_first_name: "",
    next_of_kin_last_name: "",
    next_of_kin_middle_name: "",
    next_of_kin_relationship: "",
    next_of_kin_phone_number: "",
    phone_number: "",
    retype_password: "",
    username: "",
    password: "",
    place_of_work: "",
    area_of_specialty: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    national_id: "",
    email: "",
    address_country: "",
    address_county: "",
    address_city: "",
    address_street: "",
    role: role === "" ? null : role,
    user_id: null,
  };
  if (!data) {
    return newBody;
  }
  const keys = [
    "next_of_kin",
    "phone_number",
    "username",
    "place_of_work",
    "area_of_specialty",
    "first_name",
    "last_name",
    "middle_name",
    "national_id",
    "email",
    "phone_number",
    "address",
    "user_id",
  ];
  Object.entries(data).forEach((item) => {
    if (keys.includes(item[0])) {
      if (item[0] === "address") {
        Object.entries(data[item[0]]).forEach((item) => {
          newBody[`address_${item[0]}`] = item[1];
        });
      } else if (item[0] === "next_of_kin") {
        Object.entries(data[item[0]]).forEach((item) => {
          newBody[`next_of_kin_${item[0]}`] = item[1];
        });
      } else if (item[0] === `user_id` && role) {
        newBody["user_id"] = item[1];
      } else {
        newBody[item[0]] = item[1];
      }
    }
  });
  return newBody;
};

