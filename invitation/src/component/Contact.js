import React from 'react'

const Contact = () => {
  return (
    <section className="contact">
        <h2 className="section-tit">contact info</h2>
        <ul className="contact-lists">
        <li className="contact-list">
            <figure className="character-img"><img src="" alt="bride image" /></figure>
            <ul className="contact-infos">
            <li className="contact-info tel"><a href="tel:778.000.0000">778. 000. 0000</a></li>
            <li className="contact-info email"><a href="mailto:lsdjflsf@gmail.com">lsdjflsf@gmail.com</a></li>
            </ul>
            <figure className="tel-img">
            <a href="tel:778.000.0000">
                <img src="" alt="phone image" />
            </a>
            </figure>
        </li>
        </ul>
    </section>
  )
}

export default Contact