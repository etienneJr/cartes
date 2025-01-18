import { gtfsServerUrl } from '@/app/serverUrls'

export function buildPlaceMap(lat, lon) {
	return (
		lat && lon && `${gtfsServerUrl}/placeMap/?lat=${lat}&lon=${lon}&zoom=13`
	)
}
