import { Metadata } from 'next'
import Link from 'next/link'
import { default as removeAccents } from 'remove-accents'
import départements from '../../departement/départements.yaml'
import { communesLimit, populationLimit } from '../../departement/fetchCommunes'
import { fetchRegionCommunes } from '../fetchCommunes'
import { capitalise0 } from '@/components/utils/utils'

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const region = (await params).region

	// fetch data

	const name = capitalise0(decodeURIComponent(region))
	return {
		title: `Région ${name} - Cartes`,
		description: `Parcourez les départements et les communes de la région ${name}, et les lieux et commerces présents dans chacune.`,
	}
}

export const slugify = (name) => removeAccents(name).toLowerCase()

console.log('SLUGIFY', `"${slugify('Centre-Val de Loire')}"`)

export default async function (props) {
	const { region } = await props.params

	const departements = départements.filter(
		(d) => slugify(d.nom_region) === decodeURIComponent(region)
	)

	if (!departements.length) return <p>Région non trouvée</p>

	const found = departements[0]
	const communes = await fetchRegionCommunes(
		departements.map((departement) => departement.code)
	)

	return (
		<main>
			<Link href={`/lieux/`}>⭠ Revenir à la liste des régions</Link>
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
			<h1>Communes de la région {found.nom_region}</h1>
			<p>
				Sont affichées les {communesLimit} premières communes de plus de{' '}
				{populationLimit} habitants.
			</p>
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
