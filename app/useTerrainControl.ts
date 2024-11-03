import maplibregl from 'maplibre-gl'
import { useEffect } from 'react'
import { defaultProjection } from './effects/useAddMap'

export default function useTerrainControl(map, style, relief) {
	useEffect(() => {
		if (!map) return
		if (!style.hasTerrain && !(style.key === 'france' && relief)) return

		const control = new maplibregl.TerrainControl({
			source: 'terrain-rgb',
			exaggeration: 1,
		})

		const onTerrain = (e) => {
			console.log('Terrain activé ou désactivé', e)

			if (e.terrain != null) map.setProjection({ type: 'mercator' })
			else map.setProjection(defaultProjection)
		}
		map.on('terrain', onTerrain)

		map.addControl(control, 'top-right')
		return () => {
			try {
				map.setTerrain(null)
				control && map.removeControl(control)
				map.off(onTerrain)
			} catch (e) {
				console.log('Trying to remove terrain 3D control failed', e)
			}
		}
	}, [map, style, relief])
}
