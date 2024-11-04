export const cycleHighwayMaxZoom = 15
const cycleHighwaysLineWidth = (outline = false) => [
	'interpolate',
	['linear'],
	['zoom'],
	0,
	0,
	11,
	outline ? 4 : 2,
	14,
	outline ? 6 : 3,
	16,
	outline ? 8 : 5,
	22,
	outline ? 5 : 3,
]

export const cycleHighwayLayers = [
	{
		id: 'Cycle highways outline',
		type: 'line',
		minzoom: 10,
		maxzoom: cycleHighwayMaxZoom,
		source: 'cycleHighways',
		'source-layer': 'cycleHighways',
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': 'hsl(240, 71%, 72%)',
			'line-width': cycleHighwaysLineWidth(true),
		},
	},
	{
		id: 'Cycle highways',
		type: 'line',
		minzoom: 10,
		maxzoom: cycleHighwayMaxZoom,
		source: 'cycleHighways',
		'source-layer': 'cycleHighways',
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': 'hsl(0,0%,97%)',
			'line-width': cycleHighwaysLineWidth(),
		},
	},
]
