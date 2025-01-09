import util from 'util'
import franceStyle from '@/app/styles/france'
import { exec as rawExec } from 'child_process'
export const exec = util.promisify(rawExec)
const fs = require('fs')
const path = require('path')

// TODO use local style to avoid a download every time
// const style = franceStyle(true)

const placeMapDir = '/home/ubuntu/.placeMapImages/'

export async function GET(request) {
	const requestUrl = new URL(request.url),
		{
			zoom = 15,
			lat,
			lon,
			bearing = 0,
			pitch = 0,
		} = Object.fromEntries(requestUrl.searchParams)

	const hash = placeMapDir + [zoom, lat, lon, bearing, pitch].join('-') + '.png'
	try {
		const file = fs.readFileSync(hash)
		if (file)
			return new Response(file, { headers: { 'content-type': 'image/png' } })
	} catch (e) {}

	const { stdout, stderr } = await exec(
		`xvfb-run -a ./home/ubuntu/mbgl-render --style http://cartes.app/api/styles --output ${hash} -z ${zoom} -x ${lon} -y ${lat} -b ${bearing} -p ${pitch}` // && xdg-open out.png`
	)

	const newFile = fs.readFileSync(hash)

	console.log('-------------------------------')
	console.log('maplibre place map generation')
	console.log('stdout:', stdout)
	console.log('stderr:', stderr)

	return new Response(newFile, { headers: { 'content-type': 'image/png' } })
}
