'use client'

import { ContentSection } from '@/app/ContentUI'
import { ModalCloseButton } from '@/app/UI'
import { useEffect, useState } from 'react'

export default function PaymentBlock({ setSearchParams, openSheet }) {
	const [choice, setChoice] = useState(false)
	const [message, setMessage] = useState(null)
	useEffect(() => {
		if (!choice) return

		const doFetch = async () => {
			try {
				const uuidSet = localStorage.getItem('uuid')

				if (uuidSet) return setMessage('Déjà voté !')

				const uuid = crypto.randomUUID()

				localStorage.setItem('uuid', uuid)

				// For now we don't collect votes

				const url = `https://bright-ant-40.deno.dev/sondage-paiement/${uuid}/${choice}`
				const request = await fetch(url)
				const text = await request.text()
				setMessage(text)
			} catch (e) {
				console.log('Erreur dans le sondage de paiement', e)
			}
		}
		doFetch()
	}, [choice, setMessage])
	return (
		<section>
			<ContentSection>
				<ModalCloseButton
					title="Fermer l'encart abonnement"
					onClick={() => {
						setSearchParams({ abonnement: undefined })
						openSheet(false)
					}}
				/>
				<h2>Financer l'initiative Cartes</h2>
				<p>
					Vous ne trouverez pas de pubs ici. Pour continuer de développer
					l'application, nous aurons besoin de financements. L'objectif initial
					est de couvrir les frais mensuel des serveurs.
				</p>
				{!choice && (
					<section>
						<h3 css="font-size: 110%">Comment nous soutenir ? </h3>
						<section
							css={`
								display: flex;
								flex-wrap: wrap;
								gap: 1rem;
								button {
									padding: 0.2rem 1rem;
									background: linear-gradient(
										90deg,
										rgba(41, 136, 230, 1) 0%,
										rgba(24, 90, 189, 1) 100%
									);
									color: white;
									box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 6px;
								}
							`}
						>
							<button onClick={() => setChoice('05-mois')}>
								50 centimes par mois
							</button>
							<button onClick={() => setChoice('6-an')}>6 € par an</button>
						</section>
						<p css="text-align: right; ">
							<small>Sans engagement, évidemment.</small>
						</p>
					</section>
				)}
				{choice &&
					(message ? (
						<p css="margin-top: 1rem">{message}</p>
					) : (
						<p>Appel en cours...</p>
					))}
			</ContentSection>
		</section>
	)
}
