// Declaration of the Cassini style for the IGN WMTS service

const style = (key) => ({
	version: 8,
	id: 'cassini',
	name: 'Cassini',
	sources: {
		'raster-tiles': {
			type: 'raster',
			tiles: [
				'https://data.geopf.fr/wmts?layer=BNF-IGNF_GEOGRAPHICALGRIDSYSTEMS.CASSINI&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}',
			],
			tileSize: 256,
			attribution: 'Cassini | ',
		},
	},
	layers: [
		{
			id: 'simple-tiles',
			type: 'raster',
			source: 'raster-tiles',
			minzoom: 0,
		},
	],
	glyphs: 'https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=' + key,
	bearing: 0,
	pitch: 0,
	center: [0, 0],
	zoom: 1,
})

export default style
