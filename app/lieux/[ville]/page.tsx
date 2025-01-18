import Annuaire from './Annuaire'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const { ville } = await props.params
	const searchParams = await props.searchParams
	return <Annuaire ville={ville} searchParams={searchParams} />
}
