import { ColorResult } from "react-color";

import brideImg from "../assets/img/img-bride.png";
import groomImg from "../assets/img/img-bride.png";
import iconTel from "../assets/img/icon-tel.svg";

interface ContactProps {
	brideEmail: string,
	groomEmail: string,
	brideTel: string,
	groomTel: string,
	mainColor: ColorResult,
};

const Contact = (props: ContactProps) => {
	const { brideEmail, groomEmail, brideTel, groomTel, mainColor } = props;
	const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`

  	return (
		<section className="contact">
			<h2 className="section-tit" style={{ color: mainColorRgb }}>contact info</h2>
			<ul className="contact-lists">
				<li className="contact-list">
					<figure className="character-img"><img src={brideImg} alt="bride-1" /></figure>
					<ul className="contact-infos">
						<li className="contact-info tel"><a href={`tel:${groomTel}`}>{groomTel}</a></li>
						<li className="contact-info email"><a href={`mailto:${groomEmail}`}>{groomEmail}</a></li>
					</ul>
					<figure className="tel-img" style={{ backgroundColor: mainColorRgb }}>
						<a href={`tel:${groomTel}`}>
							<img src={iconTel} alt="phone-1" />
						</a>
					</figure>
				</li>
				<li className="contact-list">
					<figure className="character-img"><img src={groomImg} alt="bride-2" /></figure>
					<ul className="contact-infos">
						<li className="contact-info tel"><a href={`tel:${brideTel}`}>{brideTel}</a></li>
						<li className="contact-info email"><a href={`mailto:${brideEmail}`}>{brideEmail}</a></li>
					</ul>
					<figure className="tel-img" style={{ backgroundColor: mainColorRgb }}>
						<a href={`tel:${brideTel}`}>
							<img src={iconTel} alt="phone-2" />
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

export default Contact;
