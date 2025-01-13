export default function categoryIconUrl(category) {
	if (!category.icon)
		throw new Error(
			'Chaque catégorie doit fournir une icône au format suivant (voir le code)'
		)
	const url = category.icon.startsWith('http')
		? category.icon
		: '/icons/' + category.icon + '.svg'
	return url
}
