import connectionDetailsIcon from '@/public/connection-details.svg'
import Image from 'next/image'
import Link from 'next/link'
import { styled } from 'next-yak'

export default function DetailsButton({ link }) {
	return (
		<Link
			href={link}
			onClick={(e) => {
				e.stopPropagation()
			}}
		>
			<Button>
				<Image
					src={connectionDetailsIcon}
					alt="Voir au détail de l'itinéraire"
				/>
			</Button>
		</Link>
	)
}

const Button = styled.div`
	width: 2rem;
	height: 1.6rem;
	margin-bottom: 1.4rem;
	img {
		width: 1.6rem;
		height: 2rem;
	}
`
