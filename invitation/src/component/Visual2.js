import React from "react";
import visualImg02 from "../assets/img/visual-02.jpg";

const Visual2 = (props) => {
  return (
    <section className="visual visualType02">
        <div className="wedding-main-date">
            <small>{props.year}</small>
            <strong>{props.monthNum}/{props.day}</strong>
        </div>
        <div className="visual-content">
            {/* <small className="wedding-tit">{props.year} Wedding Invitation</small> */}
            <h1 className="wedding-character">
                <strong className="bride">{props.bride}</strong>
                <span className="connect-sign">{props.connection}</span>
                <strong className="groom">{props.groom}</strong>
            </h1>
            <div className="wedding-date">
                <span className="wedding-calendar">{props.month} / {props.day} / {props.year} / {props.time}</span>
                <span className="wedding-location">@ {props.location}</span>
            </div>
        </div>
        <figure className="visual-img"><img src={visualImg02} alt="wedding visual img" /></figure>
    </section>
  )
}

export default Visual2