import triangle from '@/public/triangle.svg'
import Image from 'next/image'
import { nowAsYYMMDD } from './stop/Route'
import { styled } from 'next-yak'

export default function DayView({ data }) {
	const now = new Date().getTime()
	const startOfDay = (now - (now % 86400000)) / 1000
	const endDate = startOfDay + 86400

	const secondsRange = endDate - startOfDay
	const today = nowAsYYMMDD('-')
	const goodDayData = data.filter((el) => el.day === today)
	console.log('purple', goodDayData)
	return (
		<Section>
			<ol>
				<FirstNightPart>
					<span>2h</span>
					<span>🌜️</span>
					<span>8h</span>
				</FirstNightPart>
				<DayPart>
					<span></span>
					<span>🌞</span>
					<span></span>
				</DayPart>
				<LastNightPart>
					<span>20h</span>
					<span>🌜️</span>
					<span>2h</span>
				</LastNightPart>
			</ol>
			<ol style={{ position: 'relative', listStyleType: 'none' }}>
				{goodDayData.map(({ arrivalDate }) => {
					const stopSeconds = seconds(arrivalDate)

					const position = ((stopSeconds - startOfDay) / secondsRange) * 100
					return (
						<TimeTriangle key={stopSeconds} $position={position}>
							<Image src={triangle} alt="" width="10" height="10" />
						</TimeTriangle>
					)
				})}
			</ol>
		</Section>
	)
}

const seconds = (date) => date.getTime() / 1000

const Section = styled.section`
	margin: 0.4rem 0;
	width: 100%;
	> ol:first-child {
		list-style-type: none;

		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		li {
			text-align: center;
			height: 100%;
			line-height: 1rem;
			font-size: 85%;

			display: flex;
			justify-content: space-between;
			align-items: center;
			color: white;
			padding: 0 0.1rem;
			span:first-child,
			span:last-child {
				font-size: 85%;
			}
		}
		border: 1px solid var(--darkerColor);
	}
`

const FirstNightPart = styled.li`
	/* this is au pif, use https://github.com/mourner/suncalc */
	width: ${((8 - 2) / 24) * 100}%;
	background: var(--darkerColor);
`
const DayPart = styled.li`
	width: ${((20 - 8) / 24) * 100}%;
	background: beige;
`
const LastNightPart = styled.li`
	width: ${((26 - 20) / 24) * 100}%;
	background: var(--darkerColor);
`

const TimeTriangle = styled.li`
	position: absolute;
	left: ${(p) => p.$position}%;
	height: fit-content;
	line-height: 0;
	img {
		width: 0.4rem;
		height: 0.4rem;
		opacity: 0.4;
	}
`
