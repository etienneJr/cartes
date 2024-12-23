export default function splitAllez(encoded) {
	if (!encoded) return []

	return encoded.split(allezSeparator)
}

export const allezSeparator = '->'
