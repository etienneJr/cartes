import { useEffect, useState } from 'react'
import { gtfsServerUrl } from '../serverUrls'
import { findStopId, isNotTransportStop } from './stop/Stop'

export default function useTransportStopData(osmFeature, gtfsStopIds) {
	const [data, setData] = useState([])

	useEffect(() => {
		if (gtfsStopIds || !osmFeature) return
		const { lat, lon } = osmFeature
		if (!lat || !lon) return

		const doFetch = async () => {
			try {
				const response = await fetch(
					gtfsServerUrl +
						`/getStopIdsAroundGPS/?longitude=${osmFeature.lon}&latitude=${osmFeature.lat}`,
					{
						mode: 'cors',
					}
				)

				const json = await response.json()

				if (!json || !json.stopIds?.length) return
				const { stopIds } = json
				const firstMatchId = stopIds[0]

				const firstMatchResponse = await fetch(
					gtfsServerUrl + `/stopTimes/${firstMatchId}`,
					{
						mode: 'cors',
					}
				)
				const firstMatch = await firstMatchResponse.json()

				console.log('magenta stops', json, firstMatch)

				setData(firstMatch)
			} catch (e) {
				console.log('Error fetching GTFS stop and stop times by coordinates')
			}
		}
		doFetch()
	}, [setData, osmFeature, gtfsStopIds])
	useEffect(() => {
		if (!gtfsStopIds) return

		const stopIds = gtfsStopIds?.join('|')

		console.log('indigo stopIds without search', stopIds)
		const doFetch = async () => {
			const response = await fetch(gtfsServerUrl + '/stopTimes/' + stopIds, {
				mode: 'cors',
			})
			const json = await response.json()

			setData(json)
		}
		doFetch()
	}, [setData, osmFeature, gtfsStopIds])
	/* See findStopId's note !
	useEffect(() => {
		console.log('indigo osmFeature, gtfsStopIds', osmFeature, gtfsStopIds)
		if (!gtfsStopIds && !(osmFeature && osmFeature.tags)) return
		if (!gtfsStopIds && isNotTransportStop(osmFeature.tags)) return
		const stopIds = gtfsStopIds?.join('|') || findStopId(osmFeature.tags)

		console.log('indigo stopIds', stopIds)
		const doFetch = async () => {
			const response = await fetch(gtfsServerUrl + '/stopTimes/' + stopIds, {
				mode: 'cors',
			})
			const json = await response.json()

			setData(json)
		}
		doFetch()
	}, [setData, osmFeature, gtfsStopIds])
	*/
	if (!osmFeature && !gtfsStopIds) return []
	return data
}
