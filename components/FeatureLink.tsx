'use client'
import Link from 'next/link'
import useSetSearchParams from './useSetSearchParams'
import { buildAllezPart } from '@/app/SetDestination'
import { encodePlace } from '@/app/utils'

export default function FeatureLink({ feature: f }) {
	const setSearchParams = useSetSearchParams()
	return (
		<Link
			href={setSearchParams(
				{
					allez: buildAllezPart(
						f.tags.name,
						encodePlace(f.type, f.id),
						f.lon,
						f.lat
					),
				},
				true
			)}
		>
			{f.tags.name}
		</Link>
	)
}
