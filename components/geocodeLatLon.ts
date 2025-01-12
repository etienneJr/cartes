import { photonServerUrl } from '@/app/serverUrls'
import { buildPhotonAddress } from './osm/buildAddress'

export async function geocodeLatLon(latitude, longitude) {
	const request = await fetch(
		`${photonServerUrl}/reverse?lon=${longitude}&lat=${latitude}`
	)
	const json = await request.json()

	const result = {
		latitude,
		longitude,
		data: json,
	}
	return result
}

export async function geocodeGetAddress(latitude, longitude, id) {
	const candidates = await geocodeLatLon(latitude, longitude)

	console.log(candidates)

	const features = candidates?.data?.features
	if (!features) return null

	const feature = features.find(
		(feature) => console.log(feature) || feature.properties?.osm_id == id
	)

	console.log('FF', feature)
	const address = feature && buildPhotonAddress(feature)

	return address
}
