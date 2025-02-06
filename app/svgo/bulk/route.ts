import categoryColors from '@/app/categoryColors.yaml'
import { filteredMoreCategories } from '@/components/categories'
import fs from 'fs'
import { optimize } from 'svgo'
import { fromSvgToImgSrc } from '../route'
//
// AJOUT DES IMAGES SVG DANS LA CARTE POUR UTILISATION COMME SPRITE
// on prépare la listes des groupes de catégories
const groups = filteredMoreCategories.reduce((memo, next) => {
	return {
		...memo,
		[next.category]: [...(memo[next.category] || []), next],
	}
}, {})

// on parcourt les groupes

const icons = Object.entries(groups).map(([group, categories]) => {
	const groupColor = categoryColors[group]
	// on parcourt les catégories

	return categories.map((category) => {
		const imageFilename = category.icon
		const imageFinalFilename = category['icon name']
		const imageName =
			'cartesapp-' + // avoid collisions
			(imageFinalFilename || imageFilename)
		//build svg image and add to map
		const data = fs.readFileSync(
			'./public/icons/' + imageFilename + '.svg',
			'utf8'
		)

		const result = optimize(data, {})

		const optimizedSvgString = result.data
		const imgSrc = fromSvgToImgSrc(optimizedSvgString, groupColor)
		return [imageName, imgSrc]
	})
})

export async function GET(request) {
	return Response.json(icons.flat())
}
