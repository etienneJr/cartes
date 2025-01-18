export const departementUrl = (codeRaw) => {
	const code = codeRaw < 10 ? '0' + +codeRaw : codeRaw
	return `https://geo.api.gouv.fr/departements/${code}/communes?fields=code,nom,population,centre,codeRegion,codeDepartement,codesPostaux`
}
export const communesLimit = 20
export const populationLimit = 1000
export const fetchDepartementCommunes = async (departementCode) => {
	const request = await fetch(departementUrl(departementCode), {
		cache: 'force-cache',
	})
	const json = await request.json()

	const sorted = json
		.sort((b, a) => a.population - b.population)
		.filter((commune) => commune.population > populationLimit)
		.slice(0, communesLimit)
	return sorted
}
