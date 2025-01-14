import getUrl from './app/osm/getUrl'
import fetchOgImage from './components/fetchOgImage'

export default async function buildPlaceJsonLd(osmFeature, step) {
	const { tags = {} } = osmFeature
	const image = tags.image || (await fetchOgImage(getUrl(tags)))

	const { photonFeature } = step
	const addressProperties = photonFeature && photonFeature.properties

	console.log('ADD', addressProperties)

	return {
		'@context': 'https://schema.org',
		'@type': 'Place', //TODO make this more precise with categories.yaml
		//TODO read this list of properties to see which we can fill
		//https://schema.org/Place
		//additionalType: ['http://www.productontology.org/id/G%C3%AEte'], //TODO
		//this too if useful
		//TODO put all tags not used as additionalProperty https://schema.org/additionalProperty
		//
		//
		image: image ? [image] : undefined,
		//TODO duplicate of image ?
		photo: {
			'@type': 'ImageObject',
			contentUrl:
				'https://media.greengo.voyage/pictures/hosting_establishment/ordered_images/43529020-0c7c-4367-8a4f-324e72c826d9.webp',
			name: 'L&apos;Escale de Pont Chéan',
		},
		name: 'L&apos;Escale de Pont Chéan',
		description: 'Maison au calme en bord de Vilaine',
		url: 'https://www.greengo.voyage/hote/l-escale-de-pont-chean',

		address: {
			'@type': 'PostalAddress',
			addressLocality: addressProperties.city,
			postalCode: addressProperties.postcode,
			addressRegion: addressProperties.state,
			addressCountry: addressProperties.countrycode,
		},
		/* TODO Cartes.app ?
		brand: {
			'@type': 'Brand',
			logo: 'https://www.greengo.voyage/images/greengo-logo-square.svg',
			slogan: 'Des séjours écoresponsables qui font du bien',
		},
		*/
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 47.6866835,
			longitude: -1.938247,
		},
		memberOf: ['Accueil Vélo'],
	}
}
