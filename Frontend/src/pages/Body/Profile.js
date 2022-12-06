import React, { useState } from 'react'
import {Main} from "../../css/Body/Profile"
import edit from "../../assets/svg/edit.svg"
import { useGlobally } from "../../context/context"
import UserEdit from "../../components/UserEdit"
import { CheckEdit } from "../../utils/UserEdit";

const Profile = () => {
  const { state, editDetails, updateError } = useGlobally();
  const [startEdit, setStartEdit] = useState(false)
  const [currentBody, setCurrentBody] = useState(state.body);
  const changeBody = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentBody({ ...currentBody, [name]: value });
  };
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
    let answer = !startEdit;
    if (!answer) {
      answer = window.confirm("You are about to edit your details!");
      if (answer) {
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
        );
        window.scrollTo(0, 0);
        editDetails(currentBody,currentBody.role);
      }
    }
      setStartEdit(answer)
      updateError("edit_err", "inform", true, "You are now editing your Profile");
      window.scrollTo(0, 0);
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
      <section id="edit-start">
        <form>
          <UserEdit changeBody={changeBody} body={currentBody} startEdit={startEdit} />
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