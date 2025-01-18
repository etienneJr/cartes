import { Metadata } from 'next'
import Link from 'next/link'
import {
	default as removeAccent,
	default as removeAccents,
} from 'remove-accents'
import départements from '../../departement/départements.yaml'
import { fetchRegionCommunes } from '../fetchCommunes'
import Régions from '../../Régions'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const { region } = await props.params

	const departements = départements.filter(
		(d) => removeAccents(d.nom_region.toLowerCase()) === region
	)

	if (!departements.length) return <p>Région non trouvée</p>

	const found = departements[0]
	const communes = await fetchRegionCommunes(
		departements.map((departement) => departement.code)
	)

	return (
		<main>
			<Link
				href={`/lieux/region/${removeAccent(found.nom_region).toLowerCase()}`}
			>
				⭠ Revenir à la région {found.nom_region}
			</Link>
			<h1>
				Départements de la région {found.nom_region} {found.code_region}
			</h1>
			<ol>
				{departements.map(({ code, nom }) => (
					<li key={code}>
						<Link
							href={`/lieux/departement/${removeAccents(nom).toLowerCase()}`}
						>
							{nom}
						</Link>
					</li>
				))}
			</ol>
			<h1>
				Communes de la région {found.nom_region} {found.code_region}
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
