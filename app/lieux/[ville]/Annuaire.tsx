import QuickFeatureSearch from '@/app/QuickFeatureSearch'
import { PresentationWrapper } from '@/app/presentation/UI'
import StaticPageHeader from '@/components/StaticPageHeader'
import { buildPlaceMap } from '@/components/buildPlaceMap'
import { capitalise0 } from '@/components/utils/utils'
import { styled } from 'next-yak'
import Image from 'next/image'

const description = ''
export default function Page({ ville, searchParams }) {
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
		</PresentationWrapper>
	)
}

const PlaceImage = styled(Image)`
	width: 14rem;
	height: 8rem;
	object-fit: cover;
	border-radius: 2rem;
`
