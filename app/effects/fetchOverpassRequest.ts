import computeBboxArea from '@/components/utils/computeBboxArea'
import { enrichOsmFeatureWithPolyon } from '@/app/osmRequest'

export async function fetchOverpassRequest(bbox, category) {
	const surface = computeBboxArea(bbox)
	if (surface / 1000000 > 1000) return

	const queries =
		typeof category.query === 'string' ? [category.query] : category.query

	const queryCore = queries
		.map((query) => {
			return `nw${query}(${bbox.join(',')});`
		})
		.join('')
	// TODO we're missing the "r" in "nwr" for "relations"
	const overpassRequest = buildOverpassRequest(queryCore)

	console.log('overpass', overpassRequest)
	const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
		overpassRequest
	)}`
	console.log(url)
	const request = await fetch(url)
	const json = await request.json()

	const nodeElements = overpassResultsToGeojson(json).map((element) => ({
		...element,
		categoryName: category.name,
	}))
	return nodeElements
}

export const overpassResultsToGeojson = (json) => {
	const nodesOrWays = json.elements.filter((element) => {
		if (!['way', 'node'].includes(element.type)) return false // TODO relations should be handled
		return true
	})

	const waysNodes = nodesOrWays
		.filter((el) => el.type === 'way')
		.map((el) => el.nodes)
		.flat()
	const interestingElements = nodesOrWays.filter(
		(el) => !waysNodes.find((id) => id === el.id)
	)
	const nodeElements = interestingElements.map((element) => {
		if (element.type === 'node') return element
		return enrichOsmFeatureWithPolyon(element, json.elements)
	})
	return nodeElements
}

export const buildOverpassRequest = (queryCore) => `
[out:json];
(
${queryCore}
);

out body;
>;
out skel qt;

`
