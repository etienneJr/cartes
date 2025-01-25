import { useEffect, useRef, useState } from 'react'
import { nowAsYYMMDD } from './Route'
import { CalendarContent, CalendarInput, CalendarUl } from './CalendarUI'

const now = new Date()
export default function Calendar({ data }) {
	const today = nowAsYYMMDD('-')
	const [day, setDay] = useState(today)

	const actualTimes = data.filter((el) => el.day === day)

	// 48 and not 24, because the bus passing at 2h this night will be marked as
	// passing at 25h
	const hours = [...Array(48).keys()].map((hour) => {
		const str = '' + hour

		return str.length === 1 ? '0' + hour : hour
	})

	const hoursObject = Object.fromEntries(hours.map((h) => [h, []]))

	const stopByHour = actualTimes.reduce((memo, next) => {
		const thisHour = next.arrival_time.split(':')[0]
		return { ...memo, [thisHour]: [...memo[thisHour], next] }
	}, hoursObject)

	const thisHours = new Date().getHours()

	const relevantHourRef = useRef(null)
	useEffect(() => {
		if (!relevantHourRef || !relevantHourRef.current) return
		relevantHourRef.current.scrollIntoView({
			behavior: 'smooth',
			inline: 'start',
			block: 'center',
		})
	}, [relevantHourRef, thisHours])

	return (
		<div>
			<CalendarInput
				type="date"
				id="busStopTimesDate"
				name="busStopTimesDate"
				value={day}
				min={today}
				onChange={(e) => setDay(e.target.value)}
			/>
			<CalendarContent>
				<CalendarUl>
					{Object.entries(stopByHour)
						.sort(([h1], [h2]) => +h1 - +h2)
						.map(
							([hour, entries]) =>
								entries.length > 0 && (
									<li
										key={hour}
										ref={hour == thisHours ? relevantHourRef : null}
									>
										<strong>{hour % 24} h</strong>
										<ul>
											{entries.map((entry) => (
												<li
													key={entry.arrival_time}
													style={{
														opacity: entry.arrivalDate < now ? 0.3 : 1,
													}}
												>
													{entry.arrival_time.split(':')[1]}
												</li>
											))}
										</ul>
									</li>
								)
						)}
				</CalendarUl>
			</CalendarContent>
		</div>
	)
}
