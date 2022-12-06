import React from 'react'
import { Main } from "../css/components/Record"

const Record = () => {
  return (
    <Main>
      <div className="title">
        <p>List group item heading</p>
        <p className="date">Thursady, 12/21/2022</p>
      </div>
      <div className="body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nulla hic
        id iure aperiam aliquid? Sunt nemo commodi fuga, rem eaque incidunt
        accusantium cumque voluptates eveniet dolorem quasi nam minima?
      </div>
      <div className="details">
        <div className="symptom">
          <p>symptoms</p>
          <ul>
            <li>Diarrrhoea</li>
            <li>Headeache</li>
            <li>Vomiting</li>
            <li>Back pain</li>
          </ul>
        </div>
        <div className="medic">
          <p>medication</p>
          <table>
            <tr>
              <th>name</th>
              <th>dosage</th>
            </tr>
            <tr>
              <td>Capsules</td>
              <td>2*3</td>
            </tr>
            <tr>
              <td>Capsules</td>
              <td>2*3</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="footer">
        <p>By Dr. Stephen</p>
      </div>
    </Main>
  );
}

export default Record