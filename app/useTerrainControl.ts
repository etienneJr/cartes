import maplibregl from 'maplibre-gl'
import { useEffect } from 'react'

export default function useTerrainControl(map, style, relief) {
	useEffect(() => {
		if (!map) return
		if (!style.hasTerrain && !(style.key === 'france' && relief)) return

		const control = new maplibregl.TerrainControl({
			source: 'terrain-rgb',
			exaggeration: 1,
		})

		map.addControl(control, 'top-right')
		return () => {
			try {
				map.setTerrain(null)
				control && map.removeControl(control)
			} catch (e) {
				console.log('Trying to remove terrain 3D control failed', e)
			}
		}
	}, [map, style, relief])
}
