export const departementUrl = (code) =>
	`https://geo.api.gouv.fr/departements/${code}/communes?fields=code,nom,population,centre,codeRegion,codeDepartement,codesPostaux`

export const fetchDepartementCommunes = async (departementCode) => {
	const request = await fetch(departementUrl(departementCode), {
		cache: 'force-cache',
	})
	const json = await request.json()

	const sorted = json
		.sort((b, a) => a.population - b.population)
		.filter((commune) => commune.population > 10000)
	return sorted
}
