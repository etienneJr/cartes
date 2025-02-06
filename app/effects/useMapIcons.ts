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
					const hasMapImage = map.hasImage(imageFinalName)
					if (!hasMapImage) {
						map.addImage(imageFinalName, img)
						//map.updateImage(imageFinalName, img) // this does not suffice. It's the style that must be reloaded...
					}
				}
			})
		}
		doFetch()
	}, [map])
}
