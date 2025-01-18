import { fetchOverpassRequest } from '@/app/effects/fetchOverpassRequest'

export default async function Results({ category, bbox, results }) {
	return category + results.length
}
