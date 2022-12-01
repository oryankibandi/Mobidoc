import React from "react";
import { useGlobally } from "../context/context";

const UserEdit = ({ changeBody, body, startEdit }) => {
  const {
    state: { edit_err },
  } = useGlobally();
  return (
    <>
      <div className={`${edit_err.type} inform-div`}>
        <p>{edit_err.msg}</p>
      </div>
      <div className="header-div">
        <header className="header-profile">Personal details</header>
      </div>
      <div className="first-div">
        <label>First name</label>
        {startEdit ? (
          <input
            type="text"
            className="first-input"
            placeholder="First name"
            name="first_name"
            onChange={(e) => changeBody(e)}
            value={body.first_name}
          ></input>
        ) : (
          <div className="before-update">{body.first_name}</div>
        )}
      </div>
      {body.role === "doctor" || (
        <div>
          <label>Middle Name</label>
          {startEdit ? (
            <input
              type="text"
              placeholder="Middle Name"
              name="middle_name"
              onChange={(e) => changeBody(e)}
              value={body.middle_name}
            ></input>
          ) : (
            <div className="before-update">{body.middle_name}</div>
          )}
        </div>
      )}
      <div>
        <label>Last name</label>
        {startEdit ? (
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            onChange={(e) => changeBody(e)}
            value={body.last_name}
          ></input>
        ) : (
          <div className="before-update">{body.last_name}</div>
        )}
      </div>
      <div>
        <label>Email</label>
        {startEdit ? (
          <input
            type="email"
            placeholder="Email@gmail.com"
            name="email"
            onChange={(e) => changeBody(e)}
            value={body.email}
          ></input>
        ) : (
          <div className="before-update">{body.email}</div>
        )}
      </div>
      {body.role === "doctor" || (
        <div>
          <label>Phone Number</label>
          {startEdit ? (
            <input
              type="text"
              placeholder="Phone number"
              name="phone_number"
              onChange={(e) => changeBody(e)}
              value={body.phone_number}
            ></input>
          ) : (
            <div className="before-update">{body.phone_number}</div>
          )}
        </div>
      )}
      <div>
        <label>National Id</label>
        {startEdit ? (
          <input
            type="number"
            min={0}
            placeholder="National Id"
            name="national_id"
            onChange={(e) => changeBody(e)}
            value={body.national_id}
          ></input>
        ) : (
          <div className="before-update">{body.national_id}</div>
        )}
      </div>
      {body.role === "doctor" && (
        <>
          <div>
            <label>Username</label>
            {startEdit ? (
              <input
                type="text"
                value={body.username}
                name="username"
                onChange={(e) => changeBody(e)}
                placeholder="Username"
              ></input>
            ) : (
              <div className="before-update">{body.username}</div>
            )}
          </div>
          <div>
            <label>Place of work</label>
            {startEdit ? (
              <input
                type="text"
                value={body.place_of_work}
                name="place_of_work"
                onChange={(e) => changeBody(e)}
                placeholder="Place of work"
              ></input>
            ) : (
              <div className="before-update">{body.place_of_work}</div>
            )}
          </div>
          <div>
            <label>Area of specialty</label>
            {startEdit ? (
              <input
                type="text"
                placeholder="Area of specialty"
                value={body.area_of_specialty}
                name="area_of_specialty"
                onChange={(e) => changeBody(e)}
              ></input>
            ) : (
              <div className="before-update">{body.area_of_specialty}</div>
            )}
          </div>
        </>
      )}
      <div className="header-div">
        <header className="header-profile">Address</header>
      </div>
      <div>
        <label>Country</label>
        {startEdit ? (
          <input
            type="text"
            placeholder="Country"
            name="address_country"
            onChange={(e) => changeBody(e)}
            value={body.address_country}
          ></input>
        ) : (
          <div className="before-update">{body.address_country}</div>
        )}
      </div>
      <div>
        <label>City</label>
        {startEdit ? (
          <input
            type="text"
            placeholder="City"
            name="address_city"
            onChange={(e) => changeBody(e)}
            value={body.address_city}
          ></input>
        ) : (
          <div className="before-update">{body.address_city}</div>
        )}
      </div>
      {body.role === "doctor" || (
        <div>
          <label>County</label>
          {startEdit ? (
            <input
              type="text"
              placeholder="County"
              name="address_county"
              onChange={(e) => changeBody(e)}
              value={body.address_county}
            ></input>
          ) : (
            <div className="before-update">{body.address_county}</div>
          )}
        </div>
      )}
      <div>
        <label>Street</label>
        {startEdit ? (
          <input
            type="text"
            placeholder="Street"
            name="address_street"
            onChange={(e) => changeBody(e)}
            value={body.address_street}
          ></input>
        ) : (
          <div className="before-update">{body.address_street}</div>
        )}
      </div>
      {body.role === "patient" && (
        <>
          <div className="header-div">
            <header className="header-profile">Next of kin details</header>
          </div>
          <div className="first-div">
            <label>First name</label>
            {startEdit ? (
              <input
                type="text"
                className="first-input"
                value={body.next_of_kin_first_name}
                name="next_of_kin_first_name"
                onChange={(e) => changeBody(e)}
                placeholder="First name"
                required
              ></input>
            ) : (
              <div className="before-update">{body.next_of_kin_first_name}</div>
            )}
          </div>
          <div>
            <label>Middle name</label>
            {startEdit ? (
              <input
                type="text"
                value={body.next_of_kin_middle_name}
                name="next_of_kin_middle_name"
                onChange={(e) => changeBody(e)}
                placeholder="Middle name"
                required
              ></input>
            ) : (
              <div className="before-update">
                {body.next_of_kin_middle_name}
              </div>
            )}
          </div>
          <div>
            <label>Last name</label>
            {startEdit ? (
              <input
                type="text"
                value={body.next_of_kin_last_name}
                name="next_of_kin_last_name"
                onChange={(e) => changeBody(e)}
                placeholder="Last name"
                required
              ></input>
            ) : (
              <div className="before-update">{body.next_of_kin_last_name}</div>
            )}
          </div>
          <div>
            <label>Phone number</label>
            {startEdit ? (
              <input
                type="text"
                value={body.next_of_kin_phone_number}
                name="next_of_kin_phone_number"
                onChange={(e) => changeBody(e)}
                placeholder="Phonenumber"
                required
              ></input>
            ) : (
              <div className="before-update">
                {body.next_of_kin_phone_number}
              </div>
            )}
          </div>
          <div>
            <label>Relationship</label>
            {startEdit ? (
              <input
                type="text"
                value={body.next_of_kin_relationship}
                name="next_of_kin_relationship"
                onChange={(e) => changeBody(e)}
                placeholder="Relationship"
                required
              ></input>
            ) : (
              <div className="before-update">
                {body.next_of_kin_relationship}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserEdit
