import { departementUrl } from '../departement/fetchCommunes'

export const fetchRegionCommunes = async (codes) => {
	const urls = codes.map(departementUrl)

	const results = await Promise.all(
		urls.map(async (url) => {
			const request = await fetch(url, { cache: 'force-cache' })
			const json = await request.json()
			return json
		})
	)

	return results
		.flat()
		.sort((b, a) => a.population - b.population)
		.filter((commune) => commune.population > 10000)
}
