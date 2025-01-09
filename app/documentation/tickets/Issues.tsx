import { List, Nav } from '@/app/blog/UI'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo.svg'
import { description } from './metadata'
import { dateCool } from '@/app/blog/utils'
import { styled } from 'next-yak'
import { findContrastedTextColor } from '@/components/utils/colors'

export default function Issues({ issues }) {
	console.log(
		'indigo',
		issues.filter((issue) => issue.labels.length)
	)
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
				{issues.map(
					({
						number,
						updated_at,
						title,
						pull_request: pr,
						closed_at: closed,
						labels,
					}) => (
						<li key={number}>
							<div>
								<Link
									href={`/documentation/tickets/${number}`}
									dangerouslySetInnerHTML={{ __html: title }}
								/>
							</div>
							<ul>
								{closed && <Tag>terminé</Tag>}
								{pr && <Tag>code</Tag>}
								{labels.map(({ name, color }) => (
									<Tag
										key={name}
										$background={'#' + color}
										$color={findContrastedTextColor('#' + color, true)}
									>
										{name}
									</Tag>
								))}
							</ul>
							<small>{dateCool(updated_at)}</small>
						</li>
					)
				)}
			</List>
		</main>
	)
}

const Tag = styled.small`
	border: 1px solid var(--darkColor);
	background: ${(p) => p.$background || 'var(--lightestColor)'};
	color: ${(p) => p.$color || 'var(--darkestColor)'} !important;
	border-radius: 0.4rem;
	padding: 0 0.2rem 0.1rem;
	margin-right: 0.6rem;
`
