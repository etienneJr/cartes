export default async function buildSvgImage(
	imageFilename,
	outputFilename = null,
	then,
	backgroundColor
) {
	const imageRequest = await fetch(
		'/svgo?svgFilename=' +
			imageFilename +
			'&background=' +
			encodeURIComponent(backgroundColor) +
			(outputFilename ? '&outputFilename=' + outputFilename : '')
	)
	const src = await imageRequest.text()

	// If both the image and svg are found, replace the image with the svg.
	const img = new Image(40, 40)

	img.src = src

	img.onload = () => then(img, src)

	return src
}
