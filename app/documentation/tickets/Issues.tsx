import { List, Nav } from '@/app/blog/UI'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo.svg'
import { description } from './metadata'
import { dateCool } from '@/app/blog/utils'

export default function Issues({ issues }) {
	return (
		<main>
			<Nav>
				<Link href="/">
					<Image src={Logo} alt="Logo de Cartes.app" width="100" height="100" />
					Revenir sur la carte
				</Link>
			</Nav>
			<h1>Les tickets en cours de Cartes.app</h1>
			<p>{description}</p>
			<List>
				{issues.map(({ number, updated_at, title }) => (
					<li key={number}>
						<div>
							<Link
								href={`/documentation/tickets/${number}`}
								dangerouslySetInnerHTML={{ __html: title }}
							/>
						</div>
						<small>mis à jour le {dateCool(updated_at)}</small>
					</li>
				))}
			</List>
		</main>
	)
}
