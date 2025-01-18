import départements from '../départements.yaml'
import removeAccents from 'remove-accents'
import { fetchDepartementCommunes } from '../fetchCommunes'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const { departement } = await props.params

	const found = départements.find(
		(d) => removeAccents(d.nom.toLowerCase()) === departement
	)

	if (!found) return <p>Département non trouvé</p>

	const communes = await fetchDepartementCommunes(found.code)

	return (
		<main>
			<h1>
				Communes du département {found.nom} {found.code}
			</h1>
			<ol>
				{communes.map((commune) => (
					<li key={commune.code}>
						<Link href={`/lieux/${commune.nom}`}>{commune.nom}</Link>
					</li>
				))}
			</ol>
		</main>
	)
}
