import { fetchOverpassRequest } from '@/app/effects/fetchOverpassRequest'

export default async function Results({ category, bbox }) {
	const results = await fetchOverpassRequest(bbox, category)

	return category + results.length
}
