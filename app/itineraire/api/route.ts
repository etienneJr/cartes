import splitAllez from '@/components/itinerary/splitAllez'
import {
	computeMotisTrip,
	isNotTransitConnection,
} from '@/app/itinerary/transit/motisRequest'
import { initialDate } from '@/app/itinerary/transit/utils'
import { stepOsmRequest } from '@/app/stepOsmRequest'

export async function GET(request: { url: string | URL }) {
	const requestUrl = new URL(request.url),
		allez = requestUrl.searchParams.get('allez')
	const split = splitAllez(allez)

	const promises = split.map((point) => stepOsmRequest(point))
	const state = await Promise.all(promises)

	const date = initialDate()
	try {
		const start = state[0],
			destination = state[1]
		const json = await computeMotisTrip(
			{ lng: start.longitude, lat: start.latitude },
			{ lng: destination.longitude, lat: destination.latitude },
			date
		)
		if (json.state === 'error' || !json.content) {
			console.log(json)
			return new Response(`Motis error`, { status: 500 })
		}
		const { connections } = json.content
		const transitConnections = connections.filter(
			(connection) => !isNotTransitConnection(connection)
		)

		if (!transitConnections.length) {
			return new Response(
				`Itinerary API call error : no transit itinerary available at this date`,
				{
					status: 404,
				}
			)
		}
		return Response.json(json)
	} catch (error) {
		return new Response(`Itinerary API call error: ${error.message}`, {
			status: 400,
		})
	}
}
