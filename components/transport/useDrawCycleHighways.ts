import { safeRemove } from '@/app/effects/utils'
import { useEffect, useState } from 'react'
import jsonExample from './cycleHighwaysOverpassExample.json'
import osmToGeojson from 'osmtogeojson'

const overpassRequest = `
[out:json];
area["name"="France"]->.boundaryarea;

(
nwr
["cycle_network"~"FR:REV|Les Voies Lyonnaises"](area.boundaryarea);
nwr["network:type"="REV Rennes Métropole"](area.boundaryarea);
nwr[network=lcn][name~"Chronovélo"](area.boundaryarea);

nwr[cycle_highway](area.boundaryarea);
);
(._;>;);
/*end of auto repair*/
out;
`
const baseId = 'cyclehighways'
export default function (map) {
	const [data, setData] = useState()
	useEffect(() => {
		const doFetch = async () => {
			console.log('overpass', overpassRequest)
			/*
			const request = await fetch('https://overpass-api.de/api/interpreter', {
				method: 'POST',
				// The body contains the query
				// to understand the query language see "The Programmatic Query Language" on
				// https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
				body: 'data=' + encodeURIComponent(overpassRequest),
			})
			const json = await request.json()
			*/

			const json = jsonExample

			console.log('crimson overpass', json)

			const relations = osmToGeojson(json).features.filter((feature) =>
				feature.id.startsWith('relation')
			)
			const featureCollection = {
				type: 'FeatureCollection',
				features: relations,
			}

			console.log('crimson geojson', featureCollection)

			setData(featureCollection)
		}
		doFetch()
	}, [])
	useEffect(() => {
		if (!data) return
		map.addSource(baseId, {
			type: 'geojson',
			data: data,
		})
		map.addLayer({
			id: baseId + 'ways-outlines',
			type: 'line',
			source: baseId,
			layout: {},
			paint: {
				'line-color': 'crimson',
				'line-width': 7,
			},
		})
		map.addLayer({
			id: baseId + 'ways',
			type: 'line',
			source: baseId,
			layout: {},
			paint: {
				'line-color': 'magenta',
				'line-width': 4,
			},
		})
		return () => {
			safeRemove(map)([baseId], [baseId + 'ways', baseId + 'ways-outlines'])
		}
	}, [data])

	console.log('crimson', data)
}
