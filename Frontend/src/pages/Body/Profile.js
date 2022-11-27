import React from 'react'
import {Main} from "../../css/Body/Profile";
import edit from "../../assets/svg/edit.svg"
const Profile = () => {
  return (
    <Main>
      <header>
        <p>Profile</p>
        <div>
          <p>DarkMode</p>
          <input type="checkbox" />
        </div>
      </header>
      <section>
        <form>
          <div>
            <label>Name</label>
            <input type="text" value="Kevin Kipkibet"/>
          </div>
          <div>
            <label>Occupation</label>
            <input type="text" value="Ocologist"/>
          </div>
          <div>
            <label>Place of Work</label>
            <input type="text" value="Nairobi, Kenya"/>
          </div>
          <div className='edit-btn'>
            <img src={edit} alt="edit"/>
            <p>Edit Profile</p>
          </div>
        </form>
      </section>
    </Main>
  );
}

export default Profile