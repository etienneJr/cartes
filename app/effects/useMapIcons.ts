import { useEffect } from 'react'

export default function useMapIcons(map) {
	useEffect(() => {
		if (!map) return

		const doFetch = async () => {
			const request = await fetch('/svgo/bulk')
			const nameSrcMap = await request.json()

			nameSrcMap.map(([imageFinalName, src]) => {
				//build svg image and add to map
				const img = new Image(18, 18) // bonne taille pour être cohérent avec les sprites d'origine

				img.src = src

				img.onload = () => {
					const mapImage = map.getImage(imageFinalName)
					if (!mapImage) map.addImage(imageFinalName, img)
					console.log('🧮')
				}
			})
		}
		doFetch()
	}, [map])
}
