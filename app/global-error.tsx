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

	return (
		// global-error must include html and body tags
		<html>
			<body>
				<h1
					style={{
						background: 'blue',
					}}
				>
					Oups, une erreur est survenue :(
				</h1>
				<button onClick={() => reset()}>Réessayer (au cas où)</button>
				<p>Voici l'erreur {error && error.digest}</p>
			</body>
		</html>
	)
}
