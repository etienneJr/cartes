import categoryColors from '@/app/categoryColors.yaml'
import { categories } from '@/components/categories'
import fs from 'fs'
import { optimize } from 'svgo'
import { fromSvgToImgSrc } from '../route'
//
// AJOUT DES IMAGES SVG DANS LA CARTE POUR UTILISATION COMME SPRITE
// on prépare la listes des groupes de catégories
const groups = categories.reduce((memo, next) => {
	return {
		...memo,
		[next.category]: [...(memo[next.category] || []), next],
	}
}, {})

// on parcourt les groupes

const icons = Object.entries(groups).map(([group, groupCategories]) => {
	const groupColor = categoryColors[group]
	// on parcourt les catégories

	return groupCategories.map((category) => {
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

const all = icons.flat()

const map = Object.fromEntries(all)

const result = Object.entries(map)

export async function GET() {
	return Response.json(result)
}
