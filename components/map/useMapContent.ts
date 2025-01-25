import { useEffect } from 'react'

export default function useMapContent(map, bbox, setMapContent) {
	useEffect(() => {
		if (!map) return undefined
		if (!setMapContent) return undefined
		const features = map.queryRenderedFeatures()

		console.log('yoyofull', features)

		const results = features
			.filter(
				(feature) =>
					['city', 'town', 'village'].includes(feature.properties.class)
				//||feature.layer.id.includes('label')
			)
			.map((feature) => feature.properties)
		//.map((feature) => feature.properties['name:fr'])

		const rivers = features.filter((feature) =>
			['River labels', 'Ocean labels', 'Water labels'].includes(
				feature.layer.id
			)
		)
		console.log('yoyoriver', rivers)
		const riversText =
			rivers?.length &&
			`les cours d'eau ${unique(
				rivers.map((f) => f.properties['name:fr'])
			).join(', ')}`
		if (!results?.length && !riversText) return setMapContent(null)
		if (!results?.length && riversText)
			return setMapContent(`Sur la carte actuelle se trouvent ${riversText}`)
		const cityText =
			results?.length &&
			`se trouvent les villes de ${unique(results.map((p) => p['name:fr']))
				.slice(0, 6)
				.join(', ')}.${rivers.length ? ` Aussi, ${riversText}.` : ''}`

		const text = `Sur la carte actuelle ${cityText}`

		setMapContent(text)
	}, [map, bbox, setMapContent])
}

const unique = (list) => [...new Set(list)]
