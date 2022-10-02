import React from "react";

export const Rsvp = (props) => {
  return (
    <section className="rsvp">
        <h2 className="section-tit">Apply to <br/>join our wedding</h2>
        <form action="">
          <span className="input-wrap">
            <label htmlFor="name">name</label>
            <input type="text" placeholder="Please enter your full name" />
          </span>
          <span className="input-wrap">
            <label htmlFor="">participate</label>
            <span className="radio-wrap">
              <label htmlFor="yes" >yes</label>
              <input type="radio" name="participate" id="yes" value="yes"/>
              <span class="checkmark"></span>
            </span>
            <span className="radio-wrap">
              <label htmlFor="no">no</label>
              <input type="radio" name="participate" id="no" value="no"/>
              <span class="checkmark"></span>
            </span>
          </span>
          <span className="input-wrap">
            <label htmlFor="menu">menu</label>
            <span className="radio-wrap">
              <label htmlFor="menu01">{props.menu01}</label>
              <input type="radio" name="menu" id="menu01" value="menu01"/>
              <span class="checkmark"></span>
            </span>
            <span className="radio-wrap">
              <label htmlFor="menu02" >{props.menu02}</label>
              <input type="radio" name="menu" id="menu02" value="menu02"/>
              <span class="checkmark"></span>
            </span>
            <span className="radio-wrap">
              <label htmlFor="menu03" >{props.menu03}</label>
              <input type="radio" name="menu" id="menu03" value="menu03"/>
              <span class="checkmark"></span>
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