import React, { useState, useRef, useEffect } from "react";
import {Main} from "../../css/Body/Profile"
import edit from "../../assets/svg/edit.svg"
import { useGlobally } from "../../context/context"
import UserEdit from "../../components/UserEdit"
import { CheckEdit } from "../../utils/UserEdit";
import spinner from "../../assets/svg/content-dark/spinner.svg";
const Profile = () => {
  const { state, editDetails, updateError, getUser } = useGlobally();
  const [startEdit, setStartEdit] = useState("")
  const [currentBody, setCurrentBody] = useState(state.body);
  const profileForm = useRef()
  const changeBody = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentBody({ ...currentBody, [name]: value });
  };
  useEffect(
    () => {
      getUser({user_id:state.body.user_id, role:state.body.role});
    },[]
  )
  const startEditing = (e)=>{
    e.preventDefault();
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
      role,
      
    } = currentBody;
    
    if (startEdit === false) {
      profileForm.current.scrollIntoView({ behavior: "smooth" });
      updateError(
        "edit_err",
        "inform",
        true,
        "You are now editing your Profile"
      );
    }
    if (startEdit === true) {
      let answer = window.confirm("You are about to edit your data!")
      if (answer) {
        if (
          CheckEdit(
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
            role,
            updateError
          )
        ) {
          return;
        }
        profileForm.current.scrollIntoView({ behavior: "smooth" });
        editDetails(currentBody, currentBody.role);
      }
      
    }
    setStartEdit(!startEdit);
  }
  if (state.loading) {
    return (
      <div className="loading-states">
        <img src={spinner} alt="loading" />
      </div>
    );
  }
  return (
    <Main>
      <header>
        <p>Profile</p>
        <div>
          <p>DarkMode</p>
          <input type="checkbox" />
        </div>
      </header>
      <section id="edit-start" ref={profileForm}>
        <form>
          <UserEdit
            changeBody={changeBody}
            body={currentBody}
            startEdit={startEdit}
          />
          <div className="edit-btn" onClick={(e) => startEditing(e)}>
            <img src={edit} alt="edit" />
            <p>Edit Profile</p>
          </div>
        </form>
      </section>
    </Main>
  );
}

export default Profile