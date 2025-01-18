import départements from '@/app/lieux/departement/départements.yaml'
import Link from 'next/link'
import removeAccents from 'remove-accents'

const régions = départements.reduce(
	(memo, next) => ({
		...memo,
		[next.code_region]: [...(memo[next.code_region] || []), next],
	}),
	{}
)
const entries = Object.entries(régions)

export default function Régions() {
	return (
		<main>
			<h1>Annuaire des régions de France</h1>
			<ol>
				{entries.map(([code, list]) => {
					const name = list[0].nom_region
					const slug = removeAccents(name).toLowerCase()

					return (
						<li key={code}>
							<Link href={`/lieux/region/${slug}`}>{name}</Link>
						</li>
					)
				})}
			</ol>
		</main>
	)
}
