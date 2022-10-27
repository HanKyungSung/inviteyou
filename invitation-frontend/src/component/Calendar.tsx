import { ColorResult } from "react-color";
interface CalendarProps {
	year: number,
	dayOfWeek: string,
	time: string,
	month: string,
	mainColor: ColorResult,
	secondColor: ColorResult,
};

const Calendar = (props: CalendarProps) => {
	const { year, dayOfWeek, time, month, mainColor, secondColor } = props;
	const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`
	const secondColorRgb = `rgb(${secondColor.rgb.r}, ${secondColor.rgb.g}, ${secondColor.rgb.b}, ${secondColor.rgb.a})`

	return (
		<section className="calendar">
			<div className="calendar-wrap" style={{ backgroundColor: secondColorRgb }}>
				<div className="calendar-top">
					<strong className="wedding-month">
						{month}, 
						<span className="wedding-year">{year}</span>
					</strong>
					<span className="wedding-schedule">
						<span className="day-of-week">{dayOfWeek},</span>
						<span className="wedding-time">{time}</span>
					</span>
				</div>
				<table className="calendar-table">
					<thead>
						<tr>
							<th>sun</th>
							<th>mon</th>
							<th>tue</th>
							<th>wed</th>
							<th>thu</th>
							<th>fri</th>
							<th>sat</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>1</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
						</tr>
						<tr>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
							<td>9</td>
							<td>10</td>
							<td>11</td>
						</tr>
						<tr>
							<td>12</td>
							<td className="current" style={{ backgroundColor: mainColorRgb }}>13</td>
							<td>14</td>
							<td>15</td>
							<td>16</td>
							<td>17</td>
							<td>18</td>
						</tr>
						<tr>
							<td>19</td>
							<td>20</td>
							<td>21</td>
							<td>22</td>
							<td>23</td>
							<td>24</td>
							<td>25</td>
						</tr>
						<tr>
							<td>26</td>
							<td>27</td>
							<td>28</td>
							<td>29</td>
							<td>30</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	)
}

Calendar.defaultProps = {
	year : "2022",
	dayOfWeek : "Mon",
	time : '01:30 PM',
	month : "January"
}

export default Calendar;
