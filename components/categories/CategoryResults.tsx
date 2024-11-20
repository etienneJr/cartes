import Link from 'next/link'
import { bearing } from '@turf/bearing'
import turfDistance from '@turf/distance'
import useSetSearchParams from '../useSetSearchParams'
import Image from 'next/image'
import closeIcon from '@/public/close.svg'
import { sortBy } from '../utils/utils'

export default function CategoryResults({ resultsEntries, center }) {
	const setSearchParams = useSetSearchParams()
	const resultsWithoutOrder = resultsEntries
			.map(([k, v]) => v)
			.flat()
			.filter((feature) => feature.tags.name)
			.map((feature) => {
				const { lon: lon2, lat: lat2 } = feature
				return {
					...feature,
					distance: turfDistance([lon2, lat2], center),
					bearing: bearing(center, [lon2, lat2]),
				}
			}),
		results = sortBy((result) => result.distance)(resultsWithoutOrder)
	return (
		<section css={``}>
			<div
				css={`
					display: flex;
					justify-content: space-between;
					img {
						width: 0.9rem;
						height: auto;
					}
				`}
			>
				<div>
					{resultsEntries.map(([k, v], i) => (
						<>
							<span>
								<span>{v.length}</span> <span>{k.toLowerCase()}</span>
							</span>
							{i < resultsEntries.length - 1 && ', '}
						</>
					))}
				</div>
				{resultsEntries.length > 0 && (
					<Link href={setSearchParams({ cat: undefined }, true)}>
						<Image src={closeIcon} alt="Fermer" />
					</Link>
				)}
			</div>
			<ol>
				{results.map((result) => (
					<li key={result.id}>{result.tags?.name}</li>
				))}
			</ol>
		</section>
	)
}
