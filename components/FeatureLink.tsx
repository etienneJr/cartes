'use client'

import { buildAllezPartFromOsmFeature } from '@/app/SetDestination'
import Link from 'next/link'
import useSetSearchParams from './useSetSearchParams'

export default function FeatureLink({ feature: osmFeature }) {
	const setSearchParams = useSetSearchParams()
	return (
		<Link
			href={setSearchParams(
				{
					allez: buildAllezPartFromOsmFeature(osmFeature),
				},
				true
			)}
		>
			{osmFeature.tags.name}
		</Link>
	)
}
export function DynamicSearchLink({ category }) {
	const setSearchParams = useSetSearchParams()
	return (
		<Link
			href={setSearchParams({ cat: category.name }, true)}
			title="Faire une recherche de catégorie et se déplacer sur la carte pour explorer les résultats"
		>
			recherche dynamique
		</Link>
	)
}
