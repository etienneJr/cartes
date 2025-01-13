import { styled } from 'next-yak'

export default ({ value }) => (
	<Section>
		<i>Aucun résultat pour la recherche “{value}”</i>.
	</Section>
)

const Section = styled.section`
	text-align: center;
	font-size: 90%;
	margin: 20px 0;
`
