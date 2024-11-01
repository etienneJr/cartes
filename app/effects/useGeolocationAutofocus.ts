import { useDebounce } from '@/components/utils'
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

		const { latitude, longitude } = debouncedGeolocation
		map.flyTo({ padding, center: [longitude, latitude] })
	}, [debouncedGeolocation, active])
}
