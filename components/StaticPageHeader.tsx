import Logo from '@/public/logo.svg'
import Image from 'next/image'
import { css } from 'next-yak'
import Link from 'next/link'

export default function ({ small }) {
	return (
		<header>
			<Link
				href="/"
				css={css`
					text-decoration: none;
				`}
			>
				<h1
					css={
						small
							? css`
									font-size: 130%;
									margin-bottom: 0.4rem;
							  `
							: ''
					}
				>
					<Image src={Logo} alt="Logo de cartes.app" /> Cartes
				</h1>
			</Link>
		</header>
	)
}
