'use client' // Error boundaries must be Client Components

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	console.log('erreur', error, typeof error, error.toString())
	console.log(JSON.stringify(error))

	const errorMessage = error.message || 'Erreur inconnue'

	// Extract stack trace
	const stackTrace = error.stack || "Pas de trace d'erreur disponible"

	return (
		// global-error must include html and body tags
		<html>
			<body
				style={{
					background: '#57bff5',
					color: 'black',
				}}
			>
				<h1>Oups, une erreur est survenue :(</h1>
				<button onClick={() => reset()}>Réessayer (au cas où)</button>
				<p>
					Voici le contenu de l'erreur que vous pouvez partager sur{' '}
					<a href="https://bsky.app/profile/cartes.app">
						le compte Bluesky de Cartes.app
					</a>
					.
				</p>
				<p>
					Message d'erreur :{' '}
					<span style={{ background: 'white', color: 'black' }}>
						{errorMessage}
					</span>
				</p>
				<br />
				<br />
				<code>
					<small>Trace : ${stackTrace}</small>
				</code>
			</body>
		</html>
	)
}
