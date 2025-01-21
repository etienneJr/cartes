import { buildAllezPart } from '@/app/SetDestination'
import { encodePlace } from '@/app/utils'
import ItineraryIcon from '@/public/itinerary-circle-plain.svg'
import { motion } from 'motion/react'
import { styled } from 'next-yak'
import Image from 'next/image'
import Link from 'next/link'

export default function ({ setSearchParams, data: [from, to] }) {
	return (
		<AnimatedSearchProposition>
			<Link
				href={setSearchParams(
					{
						allez:
							buildAllezPart(
								from.name,
								encodePlace(from.featureType, from.osmId),
								from.longitude,
								from.latitude
							) +
							'->' +
							buildAllezPart(
								to.name,
								encodePlace(to.featureType, to.osmId),
								to.longitude,
								to.latitude
							),
					},
					true
				)}
			>
				<Image src={ItineraryIcon} alt="Lancer un itinéraire" />
				<span>
					Itinéraire {from.name}
					<span
						style={{
							margin: '0 0.4rem',
						}}
					>
						➤
					</span>{' '}
					{to.name}
				</span>
			</Link>
		</AnimatedSearchProposition>
	)
}
export const AnimatedSearchProposition = ({ children }) => (
	<AnimatedSection
		initial={{ opacity: 0, scale: 0, x: -600 }}
		animate={{ opacity: 1, scale: 1, x: 0 }}
	>
		{children}
	</AnimatedSection>
)

const AnimatedSection = styled(motion.section)`
	background: white;
	border-radius: 0.4rem;
	padding: 0.6rem;
	margin-top: 0.8rem;
	border: 1px solid var(--lightestColor);
	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		img {
			width: 1.4rem;
			height: auto;
			margin-right: 0.6rem;
		}
	}
`
