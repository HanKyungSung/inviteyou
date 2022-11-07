import './style/_visual3.scss';
import visual301 from '../assets/img/visual3-01.png';
import visual302 from '../assets/img/visual3-02.png';
import { ColorResult } from 'react-color';

interface Visual3Props {
	message: string;
	dday: string;
	names: string;
	datetime: string;
	address: string;
	mainColor: ColorResult;
}

const Visual3 = (props: Visual3Props) => {
	const {
		message,
		dday,
		names,
		datetime,
		address,
		mainColor
	} = props;
	const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`;
	const today = new Date();
	return (
		<section className="container">
			<textarea className="message" placeholder="모든것이 새로워지는 봄날, 서로의 봄이 되는 날에 당신을 초대합니다.">{message}</textarea>
			<div className="visualImg03-1">
				<img src={visual301} alt="visual3 01 img" />
			</div>
			<div className="visualImg03-2">
				<img src={visual302} alt="visual3 02 img" />
				<p id="dday">{dday}</p>
			</div>
			<input type="text" className="names" id={names} value="한경&다연" />
			<input type="datetime-local" className="datetime" id={datetime} value="2022년 04월 01일, 토요일/오후 1:33" />
			<input type="text" className="address" id={address} value="@ 0000 Vancouver St. Vancouver, BC, Canada" />
		</section>
	);
};

	Visual3.defaultProps = {
		message: '모든것이 새로워지는 봄날, 서로의 봄이 되는 날에 당신을 초대합니다.',
		dday: 'D-13',
		names: '한경&다연',
		datetime: '2022년 04월 01일, 토요일/오후 1:33',
		address: '@ 0000 Vancouver St. Vancouver, BC, Canada'
	};


export default Visual3;