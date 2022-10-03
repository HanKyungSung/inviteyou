import React from "react";
import visualImg from "../assets/img/visual-01.jpg";

const Visual = props => {
const {year, day, bride, connection, groom, month, location, time} = props;
  return (
		<section className="visual visualType01">
			<div className="visual-content">
				<small className="wedding-tit">{year} Wedding Invitation</small>
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
			<figure className="visual-img"><img src={visualImg} alt="wedding visual img" /></figure>
		</section>
	)
}

export default Visual;