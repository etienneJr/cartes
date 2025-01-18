import QuickFeatureSearch from '@/app/QuickFeatureSearch'
import { PresentationWrapper } from '@/app/presentation/UI'
import StaticPageHeader from '@/components/StaticPageHeader'
import { buildPlaceMap } from '@/components/buildPlaceMap'
import { capitalise0 } from '@/components/utils/utils'
import { styled } from 'next-yak'
import Image from 'next/image'
import Results from './Results'
import { computeBbox, findCategory } from '@/app/effects/fetchOverpassRequest'
import { getCategories } from '@/components/categories'

const description = ''
export default function Page({ ville, searchParams }) {
	const categoryName = searchParams.cat
	const [categoryNames, [category]] = getCategories(searchParams)
	console.log(category)
	const bbox = computeBbox({ lat: 48.6818519, lon: -1.9678375 })

	return (
		<PresentationWrapper>
			<StaticPageHeader small={true} />
			<header>
				<h1>Annuaire des lieux de {capitalise0(ville)}</h1>
				<p>{description}</p>
				<PlaceImage
					src={buildPlaceMap(48.1113404, -1.6793235)}
					width="200"
					height="200"
					alt={'Miniature de la carte de ' + ville}
				/>
			</header>
			<QuickFeatureSearch
				{...{ quickSearchFeaturesMap: {}, searchParams, noPhotos: true }}
			/>
			{category && <Results category={category} bbox={bbox} />}
		</PresentationWrapper>
	)
}

const PlaceImage = styled(Image)`
	width: 14rem;
	height: 8rem;
	object-fit: cover;
	border-radius: 2rem;
`
