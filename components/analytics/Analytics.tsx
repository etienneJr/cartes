import { analyticsUrl } from '@/app/serverUrls'
import { styled } from 'next-yak'
import { useEffect, useState } from 'react'

export default function Analytics() {
	const [data, setData] = useState(null)

	useEffect(() => {
		if (data) return

		const doFetch = async () => {
			try {
				// For now we don't collect votes

				const traceUrl = `${analyticsUrl}/compte`
				const traceRequest = await fetch(traceUrl)
				const json = await traceRequest.json()
				setData(json)
			} catch (e) {
				console.log(
					'🧮 statistiques : erreur dans la récupération des statistiques',
					e
				)
			}
		}
		doFetch()
	}, [data])

	if (!data) return null

	return (
		<Section>
			<h3>Statistiques d'usage</h3>
			Depuis le 18 décembre au soir,
			<br /> {data.total} utilisateurs dont ⚡️ {data.last10Minutes} dans les 10
			dernières minutes.
		</Section>
	)
}

const Section = styled.section`
	font-size: 80%;
	line-height: 1rem;
`
