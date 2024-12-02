import { optimize } from 'svgo'
import fs from 'fs'

export async function GET(request) {
	const requestUrl = new URL(request.url),
		svgFilename = requestUrl.searchParams.get('svgFilename')

	const data = fs.readFileSync('./public/icons/' + svgFilename + '.svg', 'utf8')

	const result = optimize(data, {})

	const optimizedSvgString = result.data
	return new Response(optimizedSvgString)
}
