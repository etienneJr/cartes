import { useEffect, useState } from 'react'
import { fetchOverpassRequest } from './fetchOverpassRequest'

export default function useOverpassRequest(bbox, categories) {
	const [features, setFeatures] = useState({})
	console.log('purple data', features)

	useEffect(() => {
		if (!bbox || !categories) return

		categories.map(async (category) => {
			const nodeElements = await fetchOverpassRequest(bbox, category)

			setFeatures((features) => ({
				...features,
				[category.name]: nodeElements,
			}))
		})
	}, [
		categories && categories.join((category) => category.name),
		bbox && bbox.join('|'),
	])

	return [features]
}
