import { ContentSection } from '@/app/ContentUI'
import { ContentWrapper, ModalCloseButton } from '@/app/UI'
import { useState } from 'react'

export default function PaymentBlock({ setSearchParams, openSheet }) {
	const [choice, setChoice] = useState(false)
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
							<button onClick={() => setChoice('0,5/mois')}>
								50 centimes par mois
							</button>
							<button onClick={() => setChoice('6/an')}>6 € par an</button>
						</section>
						<p css="text-align: right; ">
							<small>Sans engagement, évidemment.</small>
						</p>
					</section>
				)}
				{choice && (
					<p css="margin-top: 1rem">
						🙏 Merci ! Votre choix nous permet de mesurer l'intérêt. Intégrer un
						système de paiement n'est pas trivial.
					</p>
				)}
			</ContentSection>
		</section>
	)
}
