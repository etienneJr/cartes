import useSetSearchParams from '@/components/useSetSearchParams'
import calendarIcon from '@/public/calendar.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { DialogButton } from '../UI'
import { nowStamp, stamp } from './transit/utils'
import longueVueIcon from '@/public/longuevue.svg'
import { styled } from 'next-yak'
import {
	DateInput,
	NowButton,
	QuickDateWardButton,
	Wrapper,
} from '../itinerary/DateSelectorUI'

export const initialDate = (type = 'date', givenDate) => {
	const stringDate = (
		givenDate ? new Date(givenDate) : new Date()
	).toLocaleString('fr')
	const [date, hour] = stringDate.split(' ')

	const day = date.split('/').reverse().join('-')
	if (type === 'day') return day

	return day + 'T' + hour.slice(0, -3)
}

export const isDateNow = (date, diff = 5) => {
	const now = nowStamp()
	const dateStamp = stamp(date)

	const difference = dateStamp - now

	console.log('lightgreen diff in minutes', difference / 60)
	return difference < 60 * diff // 5 minutes
}

// Can be type date (day + hour) or type day
export default function DateSelector({ date, type = 'date', planification }) {
	const [forceShowDateInput, setForceShowDateInput] = useState(false)
	const defaultDate = initialDate(type)
	const [localDate, setLocalDate] = useState(date || defaultDate)
	const setSearchParams = useSetSearchParams()

	console.log('indigo ddate', date, isDateNow(date))
	const shouldShowDateInput = forceShowDateInput || !isDateNow(date)
	const updateDate = (newDate, noPush = true) => {
		if (!noPush) setLocalDate(newDate)
		return setSearchParams({ date: encodeDate(newDate) }, noPush)
	}
	const isFuture = !isDateNow(date, 9)
	return (
		<Wrapper>
			{isFuture && (
				<QuickDateWard
					{...{
						date,
						updateDate,
						backOrForth: 'back',
					}}
				/>
			)}
			{!shouldShowDateInput ? (
				<NowButton>
					Maintenant{' '}
					<button
						onClick={() => setForceShowDateInput(true)}
						title="Changer le moment du départ "
					>
						<Image src={calendarIcon} alt="Icône d'un agenda" />
					</button>
				</NowButton>
			) : (
				<>
					<DateInput
						type={type === 'date' ? 'datetime-local' : 'date'}
						id="date"
						name="date"
						value={localDate}
						min={defaultDate}
						onChange={(e) => {
							const value = e.target.value
							// changing e.g. the weekday starting with the 0 diigt with the keyboard will make value '' on firefox, LOL
							if (value !== '') setLocalDate(e.target.value)
						}}
					/>
					{date !== localDate && (
						<DialogButton
							onClick={() =>
								setSearchParams(
									type === 'date'
										? { date: encodeDate(localDate) }
										: { day: encodeDate(localDate) }
								)
							}
							style={{
								fontSize: '100%',
							}}
						>
							OK
						</DialogButton>
					)}
				</>
			)}
			{type === 'date' && (
				<UpdateDate date={localDate} updateDate={updateDate} />
			)}
			<QuickDateWard
				{...{
					date,
					updateDate,
					backOrForth: 'forth',
				}}
			/>
			<PreTripMode {...{ setSearchParams, planification }} />
		</Wrapper>
	)
}

const PreTripMode = ({ setSearchParams, planification }) => {
	return (
		<Link
			href={setSearchParams(
				{ planification: planification === 'oui' ? undefined : 'oui' },
				true
			)}
		>
			<PreTripModeImage
				src={longueVueIcon}
				alt="Icône longue vue représentant le mode planification à la journée"
				$planification={planification}
			/>
		</Link>
	)
}
const PreTripModeImage = styled(Image)`
	width: 1.5rem;
	height: auto;
	padding-top: 0.3rem;
	margin-left: 0.1rem;
	opacity: ${(p) => (p.$planification === 'oui' ? 1 : 0.3)};
`

const newTimestamp = () => new Date().getTime() / 1000

const UpdateDate = ({ date, updateDate }) => {
	const [now, setNow] = useState(newTimestamp())

	useInterval(
		() => {
			setNow(newTimestamp())
		},
		5 * 1000 // every 5 seconds
	)
	const isOutdated = now - new Date(date).getTime() / 1000 > 10

	if (!isOutdated) return null
	return (
		<Link href={updateDate(initialDate())}>
			<UpdateDateImage
				src={'/invertIcon.svg'}
				alt="Rafraichir l'heure de départ"
				width="10"
				height="10"
			/>
		</Link>
	)
}

const UpdateDateImage = styled(Image)`
	width: 1.5rem;
	height: auto;
	vertical-align: middle;
	margin-left: 0.2rem;
	margin-bottom: 0.2rem;
`

export const encodeDate = (date) => date?.replace(/:/, 'h')
export const decodeDate = (date) => date?.replace(/h/, ':')
function addMinutes(date, minutes) {
	return new Date(date.getTime() + minutes * 60000)
}

// TODO enable the user to click this button twice or thrice and update only
// once. setTimeout gogo !
const QuickDateWard = ({ date, updateDate, backOrForth = 'forth' }) => {
	const nextDate = initialDate(
		'date',
		addMinutes(new Date(date), backOrForth === 'forth' ? 10 : -10)
	)
	console.log('indigo date', date, nextDate)
	return (
		<QuickDateWardButton onClick={() => updateDate(nextDate, false)}>
			<Image
				src={backOrForth === 'back' ? '/backward-10.svg' : '/forward-10.svg'}
				alt="Partir 10 minutes plus tôt"
				width="10"
				height="10"
			/>
		</QuickDateWardButton>
	)
}
