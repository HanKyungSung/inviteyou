import visualImg from '../assets/img/visual-01.jpg';

interface VisualProps {
  year: number;
  day: number;
  bride: string;
  connection: string;
  groom: string;
  month: string;
  location: string;
  time: string;
}

const Visual = (props: VisualProps) => {
  const { year, day, bride, connection, groom, month, location, time } = props;

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
          <span className="wedding-calendar">
            {month} / {day} / {year} / {time}
          </span>
          <span className="wedding-location">@ {location}</span>
        </div>
      </div>
      <figure className="visual-img">
        <img src={visualImg} alt="wedding visual img" />
      </figure>
    </section>
  );
};

Visual.defaultProps = {
  year: '2022',
  day: '01',
  bride: 'Daniel',
  connection: '&',
  groom: 'Anna',
  month: 'January',
  location: 'Vancouver St. Vancouver, BC, Canada',
  time: '01:30 PM'
};

export default Visual;
