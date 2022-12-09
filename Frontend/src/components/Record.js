import React from 'react'
import { useGlobally } from '../context/context';
import { Main } from "../css/components/Record"

const Record = () => {
  const { state } = useGlobally()
  const time = new Date(state.CurrentRecord.date).toLocaleDateString();
  return (
    <Main key={state.CurrentRecord.record_uid}>
      <div className="title">
        <p>{state.CurrentRecord.diagnosis.condition}</p>
        <p className="date">{time}</p>
      </div>
      <div className="body">{state.CurrentRecord.diagnosis.description}</div>
      <div className="details">
        <div className="symptom">
          <p>symptoms</p>
          <ul>
            {state.CurrentRecord.symptoms.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className="medic">
          <p>medication</p>
          <table>
            <tr>
              <th>name</th>
              <th>dosage</th>
            </tr>
            {state.CurrentRecord.medication.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.dosage}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Main>
  );
}

export default Record