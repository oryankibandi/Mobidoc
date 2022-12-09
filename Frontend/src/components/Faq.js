import React, { useState} from 'react'
import caretDown from "../assets/svg/caret-down.svg";
import caretUp from "../assets/svg/caret-up.svg";

const Faq = ({title,body}) => {
  const [active, setActive] = useState(false)
  const changeActive = () => {
    setActive(!active)
  }
  return (
          <div className="single-faq">
            <div className="title-faq">
              <p>{title}</p>
              <img src={active ? caretDown : caretUp} alt="dropdown" onClick={()=>changeActive()} />
            </div>
            <div className={`body-faq ${active && "body-active"}`}>
              <p>
                {body}
              </p>
            </div>
          </div>)
}

export default Faq