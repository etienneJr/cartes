import fs from 'fs'

const doFetch = async (departementCode = 35) => {
	const request = await fetch(
		`https://geo.api.gouv.fr/departements/${departementCode}/communes?fields=code,nom,population,centre,codeRegion,codeDepartement,codesPostaux`
	)
	const json = await request.json()

	const big = json.filter((commune) => commune.population > 10000)

	const sorted = big.sort((b, a) => a.population - b.population)
	console.log(sorted)
	fs.writeFileSync(
		'public/communes-' + departementCode + '.json',
		JSON.stringify(sorted)
	)
	return sorted
}

doFetch()
