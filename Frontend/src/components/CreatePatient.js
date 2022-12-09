import React , {useState} from "react";
import { useEffect } from "react";
import { useGlobally } from "../context/context";
import { Main } from "../css/components/createPatient";

const CreatePatient = () => {
    const { state, addRecord} = useGlobally();
    const [data, setData] = useState([1])
    const [dataSecond, setDataSecond] = useState([1]);
    const [record,setRecord] = useState({})
    const changeData = (e) => {
        e.preventDefault()
        let newArr = data
        newArr.push(1)
        setData(newArr);
    }
    const changeDataSecond = (e) => {
      e.preventDefault();
      let newArr = dataSecond;
      dataSecond.push(1);
      setDataSecond(newArr);
    };
    const newRecord = (e) => {
        e.preventDefault()
        addRecord(record, state.patientToEdit, dataSecond.length);
    }
    const changeRecord = (e) => {
        e.preventDefault()
        const { name,value } = e.target
        setRecord({...record,[name]:value})
  }
  useEffect(
    () => {
    },[data, dataSecond]
  )
  return (
    <Main onSubmit={(e) => newRecord(e)}>
      <div className="title">
        <input
          type="text"
          placeholder="Condition"
          name="condition"
          onChange={(e) => changeRecord(e)}
          required
          value={record.condition ? record.condition : ""}
        ></input>
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          onChange={(e) => changeRecord(e)}
          required
          value={record.description ? record.description : ""}
        ></textarea>
      </div>
      <div className="details">
        <div className="symptom">
          <p>symptoms</p>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  name={`symptom_${index}`}
                  onChange={(e) => changeRecord(e)}
                  required
                  value={
                    record[`symptom_${index}`] ? record[`symptom_${index}`] : ""
                  }
                ></input>
              </li>
            ))}
            <li>
              <button className="add" onClick={(e) => changeData(e)}>
                add
              </button>
            </li>
          </ul>
        </div>
        <div className="medic">
          <p>medication</p>
          <table>
            <tr>
              <th>name</th>
              <th>dosage</th>
            </tr>
            {dataSecond.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name={`medication_name_${index}`}
                    onChange={(e) => changeRecord(e)}
                    required
                    value={
                      record[`medication_name_${index}`]
                        ? record[`medication_name_${index}`]
                        : ""
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name={`medication_dosage_${index}`}
                    onChange={(e) => changeRecord(e)}
                    value={
                      record[`medication_dosage_${index}`]
                        ? record[`medication_dosage_${index}`]
                        : ""
                    }
                  />
                </td>
              </tr>
            ))}
            <tr colSpan={2}>
              <button className="add" onClick={(e) => changeDataSecond(e)}>
                add
              </button>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <input type="submit" />
      </div>
    </Main>
  );
};

export default CreatePatient;
