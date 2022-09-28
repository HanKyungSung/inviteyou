import React from 'react'

const Visual = (props) => {
  return (
    <section className="visual">
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
        <figure className="visual-img"><img src="" alt="wedding visual img" /></figure>
    </section>
  )
}

export default Visual