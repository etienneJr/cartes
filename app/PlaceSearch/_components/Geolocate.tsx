import useSetSearchParams from '@/components/useSetSearchParams'
import geolocateIcon from '@/public/geolocate.svg'
import { styled } from 'next-yak'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Geolocate({ being }) {
	const setSearchParams = useSetSearchParams()
	const [opacity, setOpacity] = useState(0)
	useEffect(() => {
		setInterval(
			() => {
				setOpacity((opacity) => (opacity ? 0 : 1))
			},
			being ? 130 : 1000
		)
	}, [setOpacity, being])
	return (
		<Button
			$opacity={opacity}
			onClick={() => setSearchParams({ geoloc: 'oui' })}
		>
			<Image
				src={geolocateIcon}
				alt="Icône représentant la géolocalisation de l'utilisateur"
			/>
			Lancer la géoloc
		</Button>
	)
}

const Button = styled.button`
	display: flex;
	padding: 0;
	margin: 0 auto;
	text-decoration: underline;
	text-decoration-color: var(--lightColor);
	text-decoration-thickness: 2px;

	align-items: center;
	> img {
		width: 2rem;
		height: 2rem;
		border-radius: 0.6rem;
		opacity: ${(p) => p.$opacity};
		transition: opacity 0.2s ease-in-out;
	}
`
