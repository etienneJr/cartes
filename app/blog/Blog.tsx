import Logo from '@/public/logo.svg'
import { styled } from 'next-yak'
import Image from 'next/image'
import Link from 'next/link'
import { List } from './UI'
import { dateCool } from './utils'

export const description =
	"Découvrez l'histoire, les nouveautés et le futur de Cartes.app"

const Nav = styled.nav`
	margin-top: 1rem;
	a img {
		width: 2rem;
		height: auto;
		margin-right: 0.6rem;
		vertical-align: middle;
	}
`
export default function Blog({ articles }) {
	return (
		<main>
			<Nav>
				<Link href="/">
					<Image src={Logo} alt="Logo de Cartes.app" width="100" height="100" />
					Revenir sur la carte
				</Link>
			</Nav>
			<h1>Le blog de Cartes.app</h1>
			<p>{description}</p>
			<p>
				Pour l'instant, nous sommes dans une phase de construction : l'objectif
				est de sortir une version 1 en 2024, et ces articles en expliquent
				l'avancement. L'application reste largement utilisable, mais
				attendez-vous à quelques bugs.
			</p>
			<List>
				{articles.map(({ url, date, titre }) => (
					<li key={url}>
						<div>
							<Link
								href={url}
								dangerouslySetInnerHTML={{ __html: titre.html }}
							/>
						</div>
						<small>publié le {dateCool(date)}</small>
					</li>
				))}
			</List>
		</main>
	)
}
