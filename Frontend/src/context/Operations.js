const getChoice = (data) => {
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
  } = data;
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
      city: address_city,
      street: address_street,
    },
  };
  return newBody;
};
const destructure = (data) => {
  const {
    first_name,
    last_name,
    middle_name,
    national_id,
    email,
    username,
    phone_number,
    address_country,
    address_county,
    address_city,
    address_street,
    next_of_kin_first_name,
    next_of_kin_last_name,
    next_of_kin_middle_name,
    next_of_kin_relationship,
    next_of_kin_phone_number,
    place_of_work,
    area_of_specialty,
  } = data;
  let newBody = data;
  if (address_country && address_county && address_city && address_street) {
    newBody = {
      address: {
        country: address_country,
        county: address_county,
        city: address_city,
        street: address_street,
      },
    };
  }
  if (
    next_of_kin_first_name &&
    next_of_kin_last_name &&
    next_of_kin_middle_name &&
    next_of_kin_relationship &&
    next_of_kin_phone_number
  ) {
    newBody = {
      ...newBody,
      next_of_kin: {
        first_name: next_of_kin_first_name,
        last_name: next_of_kin_last_name,
        middle_name: next_of_kin_middle_name,
        relationship: next_of_kin_relationship,
        phone_number: next_of_kin_phone_number,
      },
    };
  }
  if (place_of_work && area_of_specialty && username) {
    newBody = {
      ...newBody,
      username,
      place_of_work,
      area_of_specialty,
    };
  }
  if (
    first_name &&
    last_name &&
    middle_name &&
    national_id &&
    email &&
    phone_number
  ) {
    newBody = {
      ...newBody,
      first_name,
      last_name,
      middle_name,
      national_id,
      email,
      phone_number,
    };
  }
  return newBody;
};
const updatedBody = (body, role) => {
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
        role: role,
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
        role: role,
      };
};
const parseBody = (body) => {
  const items = Object.entries(body);
  let newBody = { address: {}, next_of_kin: {} };
  const keys = [
    "next_of_kin_first_name",
    "next_of_kin_last_name",
    "next_of_kin_middle_name",
    "next_of_kin_relationship",
    "next_of_kin_phone_number",
    "phone_number",
    "retype_password",
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
    if (item[0] in keys) {
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
export { destructure, getChoice, updatedBody, parseBody };