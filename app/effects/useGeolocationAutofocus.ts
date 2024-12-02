import { useDebounce } from '@/components/utils'
import computeDistance from '@turf/distance'
import { useEffect } from 'react'

export default function useGeolocationAutofocus(
	map,
	active,
	geolocation,
	padding
) {
	const debouncedGeolocation = useDebounce(geolocation, 1000)

	useEffect(() => {
		if (!map || !debouncedGeolocation || !active) return

		const { lng, lat } = map.getCenter()

		const { latitude, longitude } = debouncedGeolocation

		const distance = computeDistance([lng, lat], [longitude, latitude])

		if (distance < 0.1) map.flyTo({ padding, center: [longitude, latitude] })
	}, [debouncedGeolocation, active])
}
