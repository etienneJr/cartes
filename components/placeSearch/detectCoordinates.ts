import { debounce } from '../utils/utils'
import { convert } from 'geo-coordinates-parser' //ES6

function hasNumber(str) {
	return /\d?/.test(str)
}

function detect(input, localSearch, zoom, then, setCoordinatesState) {
	if (!input) return

	if (!hasNumber(input)) return

	try {
		const converted = convert(input)
		console.log('indigo coord', converted)
		setCoordinatesState('Coordonnées détectées !')
		return then([converted.decimalLatitude, converted.decimalLongitude])
	} catch {
		/*we get here if the string is not valid coordinates or format is inconsistent between lat and long*/
		return setCoordinatesState(null)
	}
}

const detectCoordinates = debounce(1000, detect)

export default detectCoordinates
