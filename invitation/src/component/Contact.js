import React from "react";
import brideImg from "../assets/img/img-bride.png";
import groomImg from "../assets/img/img-bride.png";
import iconTel from "../assets/img/icon-tel.svg";
import PropTypes from "prop-types";

const Contact = props => {
	const {brideEmail, groomEmail, brideTel, groomTel} = props;
  	return (
		<section className="contact">
			<h2 className="section-tit">contact info</h2>
			<ul className="contact-lists">
				<li className="contact-list">
					<figure className="character-img"><img src={brideImg} alt="bride image" /></figure>
					<ul className="contact-infos">
						<li className="contact-info tel"><a href={`tel:${groomTel}`}>{groomTel}</a></li>
						<li className="contact-info email"><a href={`mailto:${groomEmail}`}>{groomEmail}</a></li>
					</ul>
					<figure className="tel-img">
						<a href={`tel:${groomTel}`}>
							<img src={iconTel} alt="phone image" />
						</a>
					</figure>
				</li>
				<li className="contact-list">
					<figure className="character-img"><img src={groomImg} alt="bride image" /></figure>
					<ul className="contact-infos">
						<li className="contact-info tel"><a href={`tel:${brideTel}`}>{brideTel}</a></li>
						<li className="contact-info email"><a href={`mailto:${brideEmail}`}>{brideEmail}</a></li>
					</ul>
					<figure className="tel-img">
						<a href={`tel:${brideTel}`}>
							<img src={iconTel} alt="phone image" />
						</a>
					</figure>
				</li>
			</ul>
		</section>
	)
}

Contact.defaultProps = {
	brideEmail : "bride@gmail.com",
	groomEmail : "groom@gmail.com",
	brideTel : "778.000.0000",
	groomTel : "604.000.0000"
}

Contact.propTypes = {
	brideEmail : PropTypes.string,
	groomEmail : PropTypes.string,
	brideTel : PropTypes.string,
	groomTel : PropTypes.string,
};

export default Contact;