import { fromHTML } from '@/components/utils/htmlUtils'

export default async function buildSvgImage(imageUrl, then, backgroundColor) {
	console.log('useDrawQuickSearchFeatures inside build svg image', imageUrl)
	if (imageUrl !== '/icons/bicycle-parking-secured.svg') return

	const imageRequest = await fetch('/svgo/?svgFilename=bicycle-parking-secured')
	const imageText = await imageRequest.text()

	console.log('indigo imagetext', imageText)

	// If both the image and svg are found, replace the image with the svg.
	const img = new Image(40, 40)

	const svg = fromHTML(imageText)
	//console.log({ imageText, imageUrl })

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
     style="fill:${encodeURIComponent(backgroundColor)};fill-rule:evenodd"
     cx="${xyr}"
     cy="${xyr}"
     r="${xyr}" />`
	const newInner = `${backgroundDisk}<g style="fill:white;" transform="scale(.7)" transform-origin="center" transform-box="fill-box">${svg.innerHTML}</g>`
	svg.innerHTML = newInner
	//console.log('svg', newInner)
	//console.log('svg', svg.outerHTML)

	window.svg = svg
	const formatted = svg.outerHTML
		.replaceAll(/#/g, '%23')
		.replaceAll(/"/g, "'")
		.replaceAll(/&/g, '&amp;')
	console.log('indigo svg', imageUrl, formatted)

	img.src = 'data:image/svg+xml;charset=utf-8,' + formatted

	window.img = img

	img.onload = () => then(img)
}

function allDescendants(node) {
	for (var i = 0; i < node.childNodes.length; i++) {
		var child = node.childNodes[i]
		console.log('yiyi child', child)
		if (node.localName.includes('sodipodi:')) node.removeChild(child)
		//cleanAttributes(child)
		allDescendants(child)
	}
}

const cleanAttributes = (node) => {
	if (!node.attributes) return
	;[...node.attributes].forEach(({ nodeName }) => {
		if (nodeName.includes(':')) node.removeAttribute(nodeName)
	})
}
