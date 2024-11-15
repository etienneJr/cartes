export const contourLayers = [
	{
		id: 'Contour index',
		type: 'line',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			visibility: 'visible',
		},
		paint: {
			'line-color': 'hsl(22, 35%, 55%)',
			'line-width': 1.3,
			'line-opacity': {
				stops: [
					[7, 0.2],
					[10, 0.6],
				],
			},
		},
		filter: ['all', ['in', 'nth_line', 5, 10], ['!has', 'glacier']],
	},
	{
		id: 'Glacier contour index',
		type: 'line',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			visibility: 'visible',
		},
		paint: {
			'line-color': 'hsl(192, 85%, 54%)',
			'line-width': 1.3,
			'line-opacity': {
				stops: [
					[7, 0.2],
					[10, 0.6],
				],
			},
		},
		filter: ['all', ['in', 'nth_line', 5, 10], ['==', 'glacier', 1]],
	},
	{
		id: 'Contour',
		type: 'line',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			visibility: 'visible',
		},
		paint: {
			'line-color': 'hsl(22, 35%, 55%)',
			'line-width': 0.8,
			'line-opacity': 0.5,
		},
		filter: ['all', ['!in', 'nth_line', 5, 10], ['!has', 'glacier']],
	},
	{
		id: 'Glacier contour',
		type: 'line',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			visibility: 'visible',
		},
		paint: {
			'line-color': 'hsl(192, 85%, 54%)',
			'line-width': 0.8,
			'line-opacity': 0.5,
		},
		filter: ['all', ['!in', 'nth_line', 5, 10], ['==', 'glacier', 1]],
	},
	{
		id: 'Contour labels',
		type: 'symbol',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			'text-font': ['RobotoRegular-NotoSansRegular'],
			'text-size': {
				base: 1,
				stops: [
					[15, 9.5],
					[20, 12],
				],
			},
			'text-field': '{height}',
			visibility: 'visible',
			'text-padding': 10,
			'symbol-placement': 'line',
			'symbol-avoid-edges': true,
			'text-allow-overlap': false,
			'text-ignore-placement': false,
			'text-rotation-alignment': 'map',
		},
		paint: {
			'text-color': 'hsl(20, 28%, 32%)',
			'text-halo-blur': 1,
			'text-halo-color': 'hsl(0, 0%, 100%)',
			'text-halo-width': 0.5,
		},
		metadata: {},
		filter: [
			'all',
			['==', '$type', 'LineString'],
			['in', 'nth_line', 10, 5],
			['>', 'height', 0],
			['!=', 'glacier', 1],
		],
	},
	{
		id: 'Glacier contour labels',
		type: 'symbol',
		source: 'contours',
		'source-layer': 'contours',
		layout: {
			'text-font': ['RobotoRegular-NotoSansRegular'],
			'text-size': {
				base: 1,
				stops: [
					[15, 9.5],
					[20, 12],
				],
			},
			'text-field': '{height}',
			visibility: 'visible',
			'text-padding': 10,
			'symbol-placement': 'line',
			'symbol-avoid-edges': true,
			'text-allow-overlap': false,
			'text-ignore-placement': false,
			'text-rotation-alignment': 'map',
		},
		paint: {
			'text-color': 'hsl(192, 85%, 38%)',
			'text-halo-blur': 1,
			'text-halo-color': 'hsl(0,0%,100%)',
			'text-halo-width': 0.5,
		},
		metadata: {},
		filter: [
			'all',
			['==', '$type', 'LineString'],
			['in', 'nth_line', 10, 5],
			['>', 'height', 0],
			['==', 'glacier', 1],
		],
	},
]

export const hillshadeLayers = [
	{
		id: 'Hillshade',
		type: 'hillshade',
		source: 'terrain-rgb',
		layout: {
			visibility: 'visible',
		},
		paint: {
			'hillshade-accent-color': 'hsl(51, 30%, 79%)',
			'hillshade-shadow-color': 'hsl(0, 0%, 50%)',
			'hillshade-highlight-color': 'hsl(0, 0%, 83%)',
		},
	},
]

const terrainLayers = [...hillshadeLayers, ...contourLayers]
export default terrainLayers
