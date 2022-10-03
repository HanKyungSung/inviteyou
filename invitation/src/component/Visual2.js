import React from "react";
import visualImg02 from "../assets/img/visual-02.jpg";
import PropTypes from "prop-types";

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

Visual2.defaultProps = {
	year : 2022,
	monthNum : 01,
	day : 01,
	bride : "Daniel",
	connection : "&",
	groom : "Anna",
	month : January,
	location : "Vancouver St. Vancouver, BC, Canada",
	time : '01:30 PM'
}

Visual2.propTypes = {
	year : PropTypes.number,
	monthNum : PropTypes.number,
	day : PropTypes.number,
	bride : PropTypes.string,
	connection : PropTypes.string,
	groom : PropTypes.string,
	month : PropTypes.string,
	location : PropTypes.string,
	time : PropTypes.string
};

export default Visual2;