import { useEffect } from 'react'
import useUUID from './useUUID'

export default function useTrackUser() {
	const uuid = useUUID()

	useEffect(() => {
		if (!uuid) return

		const doFetch = async () => {
			try {
				// For now we don't collect votes

				const traceUrl = `https://bright-ant-40.deno.dev/compte/${uuid}`
				const traceRequest = await fetch(traceUrl)
				const traceText = await traceRequest.text()
				console.log('Green analytics', traceText)
			} catch (e) {
				console.log('Erreur dans le sondage de paiement', e)
			}
		}
		doFetch()
	}, [uuid])
}
