import { processTags } from '../Tags'
import { buildAddress } from './buildAddress'

export default function buildOsmFeatureDescription(osmFeature) {
	if (!osmFeature || !osmFeature.tags) return
	const tags = osmFeature.tags
	const descriptionTag = tags?.description

	const address = tags && buildAddress(tags)

	const osmFeatureCategory = buildOsmFeatureCategory(osmFeature)

	return [
		osmFeatureCategory,
		descriptionTag,
		...(address ? [". À l'adresse " + address] : []),
	]
		.filter(Boolean)
		.join(' - ')
}

export const buildOsmFeatureCategory = (osmFeature) => {
	if (!osmFeature.tags) return null
	const [, soloTags] = processTags(osmFeature.tags) // processTags should get filteredRest as input, but see OsmFeature.tsx's TODO

	if (!soloTags?.length) return null
	const mainTags = soloTags.map(([raw, tag]) => tag)
	return mainTags.join(' ')
}
