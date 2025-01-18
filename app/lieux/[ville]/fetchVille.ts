export default async function fetchVille(name) {
	const url = `https://geo.api.gouv.fr/communes?nom=${name}&fields=code,nom,population,centre,codeRegion,codeDepartement,codesPostaux,departement,region`
	console.log('VILLEURL', url)
	const request = await fetch(
		url,

		{
			cache: 'force-cache',
		}
	)
	const json = await request.json()
	return json[0]
}
