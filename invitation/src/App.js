import "./App.css";
import Visual from "./component/Visual";
import Intro from "./component/Intro";
import Calendar from "./component/Calendar";
import Rsvp from "./component/Rsvp";
import Gallery from "./component/Gallery";
import Contact from "./component/Contact";

function App() {
  return (
    <main className="invitation-wrap">
      <Visual />
      <Intro />
      <Calendar />
      <Rsvp />
      <Gallery />
      <Contact />
    </main>

  );
}

export default App;
