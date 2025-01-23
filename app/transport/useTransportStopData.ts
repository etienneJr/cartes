import { useEffect, useState } from 'react'
import { gtfsServerUrl } from '../serverUrls'
import { findStopId, isNotTransportStop } from './stop/Stop'

export default function useTransportStopData(osmFeature, gtfsStopIds) {
	const [data, setData] = useState([])
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
	if (!osmFeature && !gtfsStopIds) return []
	return data
}
