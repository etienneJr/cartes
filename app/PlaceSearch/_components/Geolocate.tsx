import useSetSearchParams from '@/components/useSetSearchParams'
import Image from 'next/image'
import geolocateIcon from '@/public/geolocate.svg'
import { styled } from 'next-yak'

export function Geolocate() {
	const setSearchParams = useSetSearchParams()
	return (
		<Button onClick={() => setSearchParams({ geoloc: 'oui' })}>
			<Image
				src={geolocateIcon}
				alt="Icône représentant la géolocalisation de l'utilisateur"
			/>
			Me géolocaliser
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
	}
`
