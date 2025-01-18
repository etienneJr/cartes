import QuickFeatureSearch from '@/app/QuickFeatureSearch'
import {
	computeBbox,
	fetchOverpassRequest,
} from '@/app/effects/fetchOverpassRequest'
import { PresentationWrapper } from '@/app/presentation/UI'
import StaticPageHeader from '@/components/StaticPageHeader'
import { buildPlaceMap } from '@/components/buildPlaceMap'
import { getCategories } from '@/components/categories'
import { styled } from 'next-yak'
import Image from 'next/image'
import fetchVille from './fetchVille'
import Link from 'next/link'
import removeAccent from 'remove-accents'

const description = ''
export default async function Page({ params, searchParams }) {
	const { ville: villeName } = params

	const ville = await fetchVille(villeName)
	console.log('VILLE', ville)

	const [lon, lat] = ville.centre.coordinates
	const lonLatObject = { lat, lon }

	const categoryName = searchParams.cat
	const [categoryNames, categories] = getCategories(searchParams)
	const bbox = computeBbox(lonLatObject)

	console.log('CAT', categories, bbox)
	const results = categories?.length
		? await Promise.all(
				categories.map((category) => fetchOverpassRequest(bbox, category))
		  )
		: []

	const quickSearchFeaturesMap = Object.fromEntries(
		results.map((categoryResults, i) => [categoryNames[i], categoryResults])
	)

	console.log(quickSearchFeaturesMap)

	return (
		<PresentationWrapper>
			<StaticPageHeader small={true} />
			<Link
				href={`/lieux/departement/${removeAccent(
					ville.departement.nom
				).toLowerCase()}`}
			>
				⭠ Villes du département {ville.departement.nom}
			</Link>
			<header>
				<h1>Annuaire des lieux de {ville.nom} </h1>
				<small>({ville.codesPostaux.join(', ')})</small>
				<p>{description}</p>
				<PlaceImage
					src={buildPlaceMap(48.1113404, -1.6793235)}
					width="200"
					height="200"
					alt={'Miniature de la carte de ' + ville}
				/>
			</header>
			<QuickFeatureSearch
				{...{
					quickSearchFeaturesMap,
					searchParams,
					noPhotos: true,
					center: [lonLatObject.lon, lonLatObject.lat],
					annuaireMode: true,
				}}
			/>
		</PresentationWrapper>
	)
}

const PlaceImage = styled(Image)`
	width: 14rem;
	height: 8rem;
	object-fit: cover;
	border-radius: 2rem;
`
