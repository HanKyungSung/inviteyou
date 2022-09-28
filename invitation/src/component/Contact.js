import React from 'react'

const Contact = (props) => {
  return (
    <section className="contact">
        <h2 className="section-tit">contact info</h2>
        <ul className="contact-lists">
            <li className="contact-list">
                <figure className="character-img"><img src="" alt="bride image" /></figure>
                <ul className="contact-infos">
                    <li className="contact-info tel"><a href={`tel:${props.groomTel}`}>{props.groomTel}</a></li>
                    <li className="contact-info email"><a href={`mailto:${props.groomEmail}`}>{props.groomEmail}</a></li>
                </ul>
                <figure className="tel-img">
                    <a href={`tel:${props.groomTel}`}>
                        <img src="" alt="phone image" />
                    </a>
                </figure>
            </li>
            <li className="contact-list">
                <figure className="character-img"><img src="" alt="bride image" /></figure>
                <ul className="contact-infos">
                    <li className="contact-info tel"><a href={`tel:${props.brideTel}`}>{props.brideTel}</a></li>
                    <li className="contact-info email"><a href={`mailto:${props.brideEmail}`}>{props.brideEmail}</a></li>
                </ul>
                <figure className="tel-img">
                    <a href={`tel:${props.brideTel}`}>
                        <img src="" alt="phone image" />
                    </a>
                </figure>
            </li>
        </ul>
    </section>
  )
}

export default Contact