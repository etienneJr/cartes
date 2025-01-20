import { fromHTML } from '@/components/utils/htmlUtils'
import fs from 'fs'
import { optimize } from 'svgo'

export async function GET(request) {
	const requestUrl = new URL(request.url),
		svgFilename = requestUrl.searchParams.get('svgFilename'),
		backgroundHex = requestUrl.searchParams.get('background'),
		background = backgroundHex ? '#' + backgroundHex : null

	const data = fs.readFileSync('./public/icons/' + svgFilename + '.svg', 'utf8')

	const result = optimize(data, {})

	const optimizedSvgString = result.data
	const imgSrc = fromSvgToImgSrc(optimizedSvgString, background)
	return new Response(imgSrc)
}

const fromSvgToImgSrc = (imageText, background) => {
	console.log('SVGOSVGO', typeof background, background)
	const svg = fromHTML(imageText)

	/*
	;[...svg.querySelectorAll('*')].map((element) => {
		const name = svg.querySelector(element.localName.replace(/:/g, '\\:'))
		console.log('indigo svg', 'yoyo', name, name.id)
		try {
			if (element.localName.includes(':')) {
				svg.removeChild(name)
			}
		} catch (e) {
			console.log('error removing', element.localName, e)
		}
	})
	*/

	const svgSize = svg.getAttribute('width'), // Icons must be square !
		xyr = svgSize / 2

	const backgroundDisk = `<circle
     style="fill:${encodeURIComponent(background)};fill-rule:evenodd"
     cx="${xyr}"
     cy="${xyr}"
     r="${xyr}" />`
	const newInner = `${backgroundDisk}<g style="fill:white;" transform="scale(.7)" transform-origin="center" transform-box="fill-box">${svg.innerHTML}</g>`
	svg.innerHTML = newInner
	//console.log('svg', newInner)
	//console.log('svg', svg.outerHTML)
	const svgTextRaw = svg.outerHTML
	const svgText = svgTextRaw.replace('stroke:#000', 'stroke:#fff')

	const formatted = svgText
		.replaceAll(/#/g, '%23')
		.replaceAll(/"/g, "'")
		.replaceAll(/&/g, '&amp;')

	const src = 'data:image/svg+xml;charset=utf-8,' + formatted
	return src
}
