import { computeHumanDistance } from '@/app/RouteRésumé'
import categories from '@/app/categories.yaml'
import useOverpassRequest from '@/app/effects/useOverpassRequest'
import moreCategories from '@/app/moreCategories.yaml'
import { OpenIndicator, getOh } from '@/app/osm/OpeningHours'
import { bearing } from '@turf/bearing'
import turfDistance from '@turf/distance'
import { css, styled } from 'next-yak'
import FeatureLink from './FeatureLink'
import categoryIconUrl from './categoryIconUrl'
import { capitalise0, sortBy } from './utils/utils'

// This is very scientific haha
const latDifferenceOfRennes = 0.07,
	lonDifferenceOfRennes = 0.15,
	latDiff = latDifferenceOfRennes / 2,
	lonDiff = lonDifferenceOfRennes / 2
// 48.07729814876498,-1.7461581764997334,48.148123804291316,-1.5894174840209132
/* compute km2 to check
	const earthRadius = 6371008.8
	const [south, west, north, east] = bbox

	const surface =
		(earthRadius *
			earthRadius *
			Math.PI *
			Math.abs(Math.sin(rad(south)) - Math.sin(rad(north))) *
			(east - west)) /
		180

	// rad is:
	function rad(num) {
		return (num * Math.PI) / 180
	}
	*/

const allCategories = [...categories, ...moreCategories]

export default function SimilarNodes({ node }) {
	const { tags } = node

	const category = allCategories.find(({ query: queryRaw }) => {
		const query = Array.isArray(queryRaw) ? queryRaw : [queryRaw]

		return query.every((queryLine) => {
			return Object.entries(tags).find(
				([k, v]) => queryLine.includes(k) && queryLine.includes(v)
			)
		})
	})

	const { lat, lon } = node
	const bbox = [
		lat - latDiff / 2,
		lon - lonDiff / 2,
		lat + latDiff / 2,
		lon + lonDiff / 2,
	]

	const [quickSearchFeaturesMap] = useOverpassRequest(
		bbox,
		category ? [category] : []
	)

	const features = category && quickSearchFeaturesMap[category.name]

	if (!category || !features?.length) return null

	if (!features?.length) return

	const reference = [lon, lat]
	const featuresWithDistance =
		features &&
		features
			.filter((feature) => feature.id !== node.id && feature.tags.name)
			.map((feature) => {
				const { lon: lon2, lat: lat2 } = feature
				return {
					...feature,
					distance: turfDistance([lon2, lat2], reference),
					bearing: bearing(reference, [lon2, lat2]),
				}
			})

	const closestFeatures =
		features && sortBy(({ distance }) => distance)(featuresWithDistance)
	console.log('node', closestFeatures)
	/*
	 * Trouver la catégorie du lieu
	 * lancer une requête Overpass pour les éléments similaires autour
	 * afficher les plus proches surtout pour le SEO dans un premier temps, puis graphiquement
	 * comme des cartes sur google dans un second temps
	 * mettre un lien vers la recherche category=
	 * ajouter une liste de résultats à la recherche par catégorie
	 *
	 * */

	const title = category.title || capitalise0(category.name)
	const isOpenByDefault = category['open by default']
	const imageUrl = categoryIconUrl(category)
	return (
		<Wrapper>
			{closestFeatures && (
				<>
					<h3>{title} proches :</h3>
					<NodeList
						nodes={closestFeatures.slice(0, 10)}
						isOpenByDefault={isOpenByDefault}
					/>
					<details>
						<summary>Tous les {title} proches</summary>
						<NodeList
							nodes={closestFeatures.slice(10)}
							isOpenByDefault={isOpenByDefault}
						/>
					</details>
				</>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.section`
	margin-top: 2rem;
	background: white;
	border: 1px solid var(--lightestColor);
	border-radius: 0.4rem;
	padding: 0.3rem 0.8rem;
	h3 {
		margin-top: 0.4rem;
	}
	details {
		margin-top: 1rem;
		margin-bottom: 0.4rem;
	}
`

const NodeList = ({ nodes, isOpenByDefault }) => {
	return (
		<NodeListWrapper>
			{nodes.map((f) => {
				const humanDistance = computeHumanDistance(f.distance * 1000)
				const oh = f.tags.opening_hours
				const { isOpen } = oh ? getOh(oh) : {}

				const roseDirection = computeRoseDirection(f.bearing)
				return (
					<li key={f.id}>
						{!isOpenByDefault &&
							(oh == null ? (
								<OpenIndicatorPlaceholder />
							) : (
								<OpenIndicator isOpen={isOpen === 'error' ? false : isOpen} />
							))}
						<FeatureLink feature={f} />{' '}
						<small>
							à {humanDistance[0]} {humanDistance[1]} vers {roseDirection}
						</small>
					</li>
				)
			})}
		</NodeListWrapper>
	)
}

const NodeListWrapper = styled.ul`
	margin-left: 0.2rem;
	list-style-type: none;
`

const OpenIndicatorPlaceholder = styled.span`
	display: inline-block;
	width: 1.8rem;
`

export const computeRoseDirection = (bearing) =>
	Math.abs(bearing) > 135
		? 'le sud'
		: Math.abs(bearing) < 45
		? 'le nord'
		: bearing < 0
		? "l'ouest"
		: "l'est"
