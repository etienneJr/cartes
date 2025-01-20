import fs from 'fs'
import glob from 'glob'
import path from 'path'
import spritezero from '@jutaz/spritezero'

const pixelRatios = [1, 2]

pixelRatios.forEach(function (pxRatio) {
	var svgs = ['restaurant', 'cafe']
		//		.sync(path.resolve(path.join(__dirname, 'input/*.svg')))
		.map(function (id) {
			return {
				svg: fs.readFileSync(
					path.resolve(path.join(__dirname, '../public/icons/' + id + '.svg'))
				),
				id,
			}
		})

	var pngPath = path.resolve(
		path.join(__dirname, '../public/sprite/sprite-cartes@' + pxRatio + '.png')
	)
	var jsonPath = path.resolve(
		path.join(__dirname, '../public/sprite/sprite-cartes@' + pxRatio + '.json')
	)

	// Pass `true` in the layout parameter to generate a data layout
	// suitable for exporting to a JSON sprite manifest file.
	spritezero.generateLayout(
		{ imgs: svgs, pixelRatio: pxRatio, sdf: true, format: true },
		function (err, dataLayout) {
			if (err) return
			fs.writeFileSync(jsonPath, JSON.stringify(dataLayout))
		}
	)

	// Pass `false` in the layout parameter to generate an image layout
	// suitable for exporting to a PNG sprite image file.
	spritezero.generateLayout(
		{ imgs: svgs, pixelRatio: pxRatio, sdf: true, format: false },
		function (err, imageLayout) {
			spritezero.generateImage(imageLayout, function (err, image) {
				if (err) return
				fs.writeFileSync(pngPath, image)
			})
		}
	)
})
