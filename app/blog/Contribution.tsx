import { styled } from 'next-yak'
import Link from 'next/link'

export default function Contribution({ slug }) {
	return (
		<ContributionLink
			href={`https://github.com/cartesapp/cartes/edit/master/articles/${slug}.mdx`}
		>
			✏️ Signaler une erreur
		</ContributionLink>
	)
}

const ContributionLink = styled(Link)`
	display: block;
	margin: 0 0 0 auto;
	width: fit-content;
	margin-top: 2rem;
`
