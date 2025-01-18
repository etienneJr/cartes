import départements from '../départements.yaml'
import removeAccents from 'remove-accents'
export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function (props) {
	const { departement } = await props.params

	const found = départements.find(
		(d) => removeAccents(d.nom.toLowerCase()) === departement
	)

	if (!found) return <p>Département non trouvé</p>

	return (
		<main>
			{found.nom} {found.code}
		</main>
	)
}
