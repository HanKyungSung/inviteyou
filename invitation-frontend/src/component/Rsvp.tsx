interface RsvpProps {
	menu01: string,
	menu02: string,
	menu03: string,
	mainColor: string,
};

const Rsvp = (props: RsvpProps) => {
	const { menu01, menu02, menu03, mainColor } = props;

	function HoverBtnStyle(e: any) {
		e.target.style.color = mainColor;
		e.target.style.backgroundColor = "#fff";
	}
	function DefaultBtnStyle(e: any) {
		e.target.style.color = "#fff";
		e.target.style.backgroundColor = mainColor;
	}

	return (
		<section className="rsvp">
			<h2 className="section-tit" style={{ color: mainColor }}>Apply to <br />join our wedding</h2>
			<form action="">
				<span className="input-wrap">
					<label htmlFor="name">name</label>
					<input type="text" placeholder="Please enter your full name" />
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
					<textarea name="note" id="" cols={30} rows={10}
						defaultValue="Please provide us any food restriction you have "></textarea>
				</span>
				<button type="submit" 
				style={{ backgroundColor: mainColor, borderColor: mainColor }}
				onMouseOver={HoverBtnStyle}
				onMouseLeave={DefaultBtnStyle}
				>
				submit</button>
			</form>
		</section>
		
	)
}

Rsvp.defaultProps = {
	menu01 : "MENU01",
	menu02 : "MENU02",
	menu03 : "MENU03"
}

export default Rsvp;