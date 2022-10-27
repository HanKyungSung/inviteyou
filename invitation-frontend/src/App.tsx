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
import { ColorResult } from "react-color";

function App() {
	
	const defaultColor: ColorResult = {
		hex: "#ccccc",
		hsl: {
			h: 0,
			s: 0,
			l: 0,
			a: 1
		},
		rgb: {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		}
	}

	const [ mainColor, setMainColor ] = useState<ColorResult>(defaultColor);
	const [ secondColor, setSecondColor ] = useState<ColorResult>(defaultColor);

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
