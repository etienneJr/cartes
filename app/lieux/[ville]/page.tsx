import Annuaire from './Annuaire'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const params = await props.params
	const searchParams = await props.searchParams

	return <Annuaire params={params} searchParams={searchParams} />
}
