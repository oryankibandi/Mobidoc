import React from 'react'
const User = ({ user }) => {
  return (
    <>
      <div className="header-div">
        <header className="header-profile">Personal details</header>
      </div>
      {Object.entries(user).map((item, index) => {
        if (item[0] === "user_id" || item[0] === "role") {
          return <></>;
        } else if (item[0] === "address" || item[0] === "next_of_kin" || item[0] === "password" || item[0] === "retype_password") {
          return <></>;
        } else {
          return (
            <div key={index}>
              <label>{item[0].replace(/_/g, " ")}</label>
              <div className="before-update">{item[1]}</div>
            </div>
          );
        }
      })}
      <div className="header-div">
        <header className="header-profile">Address</header>
      </div>
      {Object.entries(user["address"]).map((inner) => {
        return (
          <div>
            <label>{inner[0].replace(/_/g, " ")}</label>
            <div className="before-update">{inner[1]}</div>
          </div>
        );
      })}

      {user.role === "56332" && <>
      <div className="header-div">
        <header className="header-profile">Next of kin details</header>
      </div>
      {Object.entries(user["next_of_kin"]).map((inner) => {
        return (
          <div>
            <label>{inner[0].replace(/_/g, " ")}</label>
            <div className="before-update">{inner[1]}</div>
          </div>
        );
      })}
      </>}
    </>
  );
}

export default User