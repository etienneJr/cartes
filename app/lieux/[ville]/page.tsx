import Annuaire from './Annuaire'
import Régions from './Régions'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const params = await props.params
	const searchParams = await props.searchParams

	if (!params.ville) return <Régions />
	return <Annuaire params={params} searchParams={searchParams} />
}
