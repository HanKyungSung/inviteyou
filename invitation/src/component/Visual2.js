import React from "react";
import visualImg02 from "../assets/img/visual-02.jpg";

const Visual2 = props => {
	const {year, monthNum, day, bride, connection, groom, month, location, time} = props;
  	return (
		<section className="visual visualType02">
			<div className="wedding-main-date">
				<small>{year}</small>
				<strong>{monthNum}/{day}</strong>
			</div>
			<div className="visual-content">
				{/* <small className="wedding-tit">{year} Wedding Invitation</small> */}
				<h1 className="wedding-character">
					<strong className="bride">{bride}</strong>
					<span className="connect-sign">{connection}</span>
					<strong className="groom">{groom}</strong>
				</h1>
				<div className="wedding-date">
					<span className="wedding-calendar">{month} / {day} / {year} / {time}</span>
					<span className="wedding-location">@ {location}</span>
				</div>
			</div>
			<figure className="visual-img"><img src={visualImg02} alt="wedding visual img" /></figure>
		</section>
	)
}

export default Visual2;