interface IntroProps {
	bride: string,
	connection: string,
	groom: string,
	mainColor: string
};

const Intro = (props: IntroProps) => {
	const { bride, connection, groom, mainColor } = props;
	
	return (
		<section className="intro">
			<h2 className="section-tit" style={{ color: mainColor }}>Forever together</h2>
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer tooka galley of type and scrambled it to make a type specimen book. </p>
			<span className="wedding-character">
				<strong className="bride">{bride}</strong>
				<span className="connect-sign">{connection}</span>
				<strong className="groom">{groom}</strong>
			</span>
		</section>
	)
}

Intro.defaultProps = {
	bride : "Daniel",
	connection : "&",
	groom : "Anna"
}

export default Intro;
