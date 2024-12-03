'use client'
import logoOsm from '@/public/openstreetmap.svg'
import { styled } from 'next-yak'
import Image from 'next/image'
import Link from 'next/link'

export default function OsmAttribution() {
	return (
		<Wrapper>
			<Link href="https://www.openstreetmap.fr">
				<Image src={logoOsm} alt="Logo OpenStreetMap" />
				<span>OpenStreetMap</span>
			</Link>
		</Wrapper>
	)
}

const Wrapper = styled.span`
	img {
		vertical-align: middle;
		width: 1.8rem;
		height: auto;
		margin-right: 0.4rem;
	}
	a {
		text-wrap: nowrap;
	}
`
