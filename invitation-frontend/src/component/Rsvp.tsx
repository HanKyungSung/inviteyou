import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import { sendRsvpApi } from '../utils/rsvpUtils';

interface RsvpProps {
  menu01: string;
  menu02: string;
  menu03: string;
  mainColor: ColorResult;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  participate: HTMLInputElement;
  menu: HTMLInputElement;
  note: HTMLInputElement;
}

interface RsvpFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const Rsvp = (props: RsvpProps) => {
  const { menu01, menu02, menu03, mainColor } = props;
  const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`;

  const [submitBtn, setsubmitBtn] = useState<boolean>(false);
  const handleMouseEnter = () => setsubmitBtn(true);
  const handleMouseLeave = () => setsubmitBtn(false);
  const handleSubmitRSVP = (e: React.FormEvent<RsvpFormElements>) => {
    e.preventDefault();

    const { name, participate, menu, note } = e.currentTarget.elements;
    const params = {
      name: name.value,
      participate: participate.value,
      menu: menu.value,
      note: note.value
    };

    sendRsvpApi(params);
  };

  const hoverStyle = {
    color: submitBtn ? mainColorRgb : 'white',
    backgroundColor: submitBtn ? 'white' : mainColorRgb,
    borderColor: mainColorRgb
  };

  return (
    <section className="rsvp">
      <h2 className="section-tit" style={{ color: mainColorRgb }}>
        Apply to <br />
        join our wedding
      </h2>
      <form action="" onSubmit={handleSubmitRSVP}>
        <span className="input-wrap">
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            placeholder="Please enter your full name"
          />
        </span>
        <span className="input-wrap">
          <label htmlFor="">participate</label>
          <span className="radio-wrap">
            <label htmlFor="yes">yes</label>
            <input type="radio" name="participate" id="yes" value="yes" />
            <span className="checkmark"></span>
          </span>
          <span className="radio-wrap">
            <label htmlFor="no">no</label>
            <input type="radio" name="participate" id="no" value="no" />
            <span className="checkmark"></span>
          </span>
        </span>
        <span className="input-wrap">
          <label htmlFor="menu">menu</label>
          <span className="radio-wrap">
            <label htmlFor="menu01">{menu01}</label>
            <input type="radio" name="menu" id="menu01" value="menu01" />
            <span className="checkmark"></span>
          </span>
          <span className="radio-wrap">
            <label htmlFor="menu02">{menu02}</label>
            <input type="radio" name="menu" id="menu02" value="menu02" />
            <span className="checkmark"></span>
          </span>
          <span className="radio-wrap">
            <label htmlFor="menu03">{menu03}</label>
            <input type="radio" name="menu" id="menu03" value="menu03" />
            <span className="checkmark"></span>
          </span>
        </span>
        <span className="input-wrap">
          <label htmlFor="note">allegetic note</label>
          <textarea
            name="note"
            id=""
            cols={30}
            rows={10}
            defaultValue="Please provide us any food restriction you have "
          ></textarea>
        </span>
        <button
          type="submit"
          // style={hoverState}
          // onMouseEnter={()=> setsubmitBtn(true)}
          // onMouseLeave={()=> setsubmitBtn(false)}
          style={hoverStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          submit
        </button>
      </form>
    </section>
  );
};

Rsvp.defaultProps = {
  menu01: 'MENU01',
  menu02: 'MENU02',
  menu03: 'MENU03',
  mainColor: '#ccc',
  submitBtn: '#fff',
  setsubmitBtn: true
};

export default Rsvp;
