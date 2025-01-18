import { gtfsServerUrl } from '@/app/serverUrls'

export function buildPlaceMap(lat, lon, zoom = 12) {
	return (
		lat &&
		lon &&
		`${gtfsServerUrl}/placeMap/?lat=${lat}&lon=${lon}&zoom=${zoom}`
	)
}
