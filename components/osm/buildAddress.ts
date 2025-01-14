export const buildAddress = (t: object, noPrefix = false) => {
	const g = (key) => {
		const value = noPrefix ? t[key] : t[`addr:` + key] || t['contact:' + key]
		return value || ''
	}

	// This bit of code is ugly, sorry, but had to make it work fast, there's
	// plenty of things more important than a beautiful address for now
	const firstPart =
		g('housenumber') || g('street') ? `${g('housenumber')} ${g('street')}` : ''
	const address = `${firstPart}${
		firstPart && (g('postcode') || g('city') || g('state')) ? ', ' : ''
	} ${g('postcode')} ${g('city')} ${g('state')}
`
	if (address.trim() === '') return null
	return address
}

export function buildPhotonAddress(geocoded) {
	const p = geocoded.properties || geocoded
	if (!p) return null

	const selection = [p.city, p.state, p.country].filter(Boolean)
	const address = selection.join(', ')

	return address
}

export const deduplicatePhotonAddress = (osmAddress, geocoded) => {
	const test = osmAddress ? osmAddress.toLowerCase() : ''
	if (!geocoded) return null
	const p = geocoded.properties

	const entries = Object.entries(p)

	const dedupEntries = entries
		.map(([k, v]) => {
			if (!v) return false

			if (test.includes(('' + v).toLowerCase())) return false
			return [k, v]
		})
		.filter(Boolean)

	if (!dedupEntries.length) return null

	const dedup = Object.fromEntries(dedupEntries)

	const photonAddress = buildPhotonAddress(dedup)

	return photonAddress
}
