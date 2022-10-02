import "./style/style.css";
import Visual from "./component/Visual";
import Visual2 from "./component/Visual2";
import Intro from "./component/Intro";
import Calendar from "./component/Calendar";
import Rsvp from "./component/Rsvp";
import Gallery from "./component/Gallery";
import Contact from "./component/Contact";

function App() {
  return (
    <main className="invitation-wrap type01">
      {/* <Visual 
      year="2023" day="23" month="Aug" time="1:30 PM" 
      location="0000 Vancouver St. Vancouver, BC, Canada" 
      bride="Anna" groom="Daniel" connection="&"
      /> */}
      <Visual2 
      year="2023" day="23" month="Aug" monthNum="08" time="1:30 PM" 
      location="0000 Vancouver St. Vancouver, BC, Canada" 
      bride="Anna" groom="Daniel" connection="and"
      />
      <Intro bride="Anna" groom="Daniel" connection="&"/>
      <Calendar year="2022" month="October" dayOfWeek="Fri" time="1:30PM"/>
      <Rsvp menu01="Menu 01" menu02="Menu 02" menu03="Menu 03"/>
      <Gallery />
      <Contact 
      groomTel="778.000.0000" groomEmail="sample@gmail.com" 
      brideTel="778.000.0000" brideEmail="sample@gmail.com"
      />
    </main>

  );
}

export default App;
