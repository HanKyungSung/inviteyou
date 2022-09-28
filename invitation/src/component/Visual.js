import React from "react";
import visualImg from "../assets/img/visual-01.jpg";

const Visual = (props) => {
  return (
    <section className="visual">
        <div className="visual-content">
            <small className="wedding-tit">{props.year} Wedding Invitation</small>
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
        <figure className="visual-img"><img src={visualImg} alt="wedding visual img" /></figure>
    </section>
  )
}

export default Visual