import { useEffect } from 'react'
import useUUID from './useUUID'
import { analyticsUrl } from '@/app/serverUrls'

export default function useTrackUser() {
	const uuid = useUUID()

	useEffect(() => {
		if (!uuid) return

		const doFetch = async () => {
			try {
				const traceUrl = `${analyticsUrl}/compte/${uuid}`
				const traceRequest = await fetch(traceUrl)
				const traceText = await traceRequest.text()
				console.log('Green analytics', traceText)
			} catch (e) {
				console.log('Erreur dans le sondage de paiement', e)
			}
		}
		//doFetch() analytics deactivated, we've successfully used Deno kv for this
		//but don't want to pay yet, since Umami does the job on our server
	}, [uuid])
}
