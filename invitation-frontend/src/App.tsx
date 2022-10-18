import { useState } from "react";
import "./style/style.css";
import CardBuilder from "./CardBuilder";
// import Visual from "./component/Visual";
import Visual2 from "./component/Visual2";
import Intro from "./component/Intro";
import Calendar from "./component/Calendar";
import Rsvp from "./component/Rsvp";
import Gallery from "./component/Gallery";
import Contact from "./component/Contact";

function App() {
	const [ mainColor, setMainColor ] = useState<any>({});
	const [ secondColor, setSecondColor ] = useState<string>('#ccc');
	
	return (
		<CardBuilder mainColor={mainColor}  setMainColor={setMainColor} secondColor={secondColor} setSecondColor={setSecondColor}>
			<main className="invitation-wrap type01">
				<Visual2 mainColor={mainColor} />
				<Intro mainColor={mainColor}/>
				<Calendar mainColor={mainColor} secondColor={secondColor}/>
				<Rsvp mainColor={mainColor} />
				<Gallery mainColor={mainColor}/>
				<Contact mainColor={mainColor} />
			</main>
		</CardBuilder>
	);
}

export default App;