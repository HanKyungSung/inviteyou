import React from 'react'

export const Rsvp = () => {
  return (
    <section className="rsvp">
        <h2 className="section-tit">Apply to <br/>join our wedding</h2>
        <form action="">
          <span className="input-wrap">
            <label htmlFor="name">name</label>
            <input type="text" placeholder="Please enter your full name" />
          </span>
          <span className="input-wrap">
            <label htmlFor="participate">participate</label>
            <span className="radio-wrap">
              <input type="radio" />
              <label htmlFor="yes">yes</label>
            </span>
            <span className="radio-wrap">
              <input type="radio" />
              <label htmlFor="no">no</label>
            </span>
          </span>
          <span className="input-wrap">
            <label htmlFor="menu">menu</label>
            <span className="radio-wrap">
              <input type="radio" />
              <label htmlFor="menu01">menu 01</label>
            </span>
            <span className="radio-wrap">
              <input type="radio" />
              <label htmlFor="menu02">menu 02</label>
            </span>
            <span className="radio-wrap">
              <input type="radio" />
              <label htmlFor="menu03">menu 03</label>
            </span>
          </span>
          <span className="input-wrap">
            <label htmlFor="note">allegetic note</label>
            <textarea name="note" id="" cols="30" rows="10">
              Please provide us any food restriction you have 
            </textarea>
          </span>
          <button type="submit">submit</button>
        </form>
      </section>
  )
}
export default Rsvp