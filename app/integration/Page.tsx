import Logo from '@/public/logo.svg'
import WebIcon from '@/public/web.svg'
import { styled } from 'next-yak'
import Image from 'next/image'
import Link from 'next/link'
import Privacy from '@/articles/vie-privée.mdx'
import CTA from './CTA'
import { PresentationWrapper } from './UI.tsx'

export const title = 'Intégrer une carte sur votre site Web'

const iframeStyle = `
					width: 20rem;
					height: 36rem;
					margin: 0 auto;
					margin-bottom: 5vh;
					display: block;
					border-radius: 1rem;
					border: 3px solid var(--darkColor);
					box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
						rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`
const iframeCode = `
				<iframe
					src="https://cartes.app/?allez=Little+Beetles|n5352517991|-1.6826|48.1118"
					style="${iframeStyle}"
				></iframe>
				`

export default function Page() {
	return (
		<PresentationWrapper>
			<section>
				<header>
					<h1>
						<Image src={Logo} alt="Logo de cartes.app" /> Cartes
					</h1>
				</header>
			</section>
			<h2>Intégrez une carte à votre site en 30 secondes</h2>

			<p>
				Vous êtes un club sportif, une association, un commerce, une
				administration avec des locaux ouverts au public ? Il est important de
				montrer une carte à vos utilisateurs.{' '}
			</p>
			<p>
				Vous pouvez intégrer notre carte souveraine en un simple bout de code
				sur votre Wordpress ou autre outil de gestion de site Web, gratuitement,
				sans envoyer les données de vos utilisateurs à Google.
			</p>
			<p>Voici un exemple sur un commerce à Rennes :</p>
			<Blockquote>{iframeCode}</Blockquote>

			<Iframe src="https://cartes.app/?allez=Little+Beetles|n5352517991|-1.6826|48.1118" />
			<p>
				Pour intégrer <strong>votre lieu</strong>, remplacez simplement le
				contenu de l'attribut source ci-dessus par l'URL de votre lieu sur
				cartes.app.
			</p>
			<p>
				Votre lieu manque d'informations ? Téléphone, description, type de
				cuisine, photo : en deux clics, ajoutez ces informations sur{' '}
				<a href="https://www.openstreetmap.fr/contribuer/">OpenStreetMap</a>.
			</p>
			<h3>Intégrer une vue satellite</h3>
			<h3>Intégrer un itinéraire</h3>
			<h3>Intégrer une vue de rue</h3>
			<p>Panoramax.</p>
			<h2>Un projet entièrement gratuit, libre et open-source</h2>
			<p>
				Tout le code de Cartes est ouvert sur la plateforme{' '}
				<a href="https://github.com/laem/cartes">Github</a>. Il n'y a pas grand
				chose de plus à dire : tout est transparent et réutilisable par d'autres
				équipes, associations, collectivités ou entreprises, tant qu'elles
				reversent leur contribution à la communauté.
			</p>
			<p>
				Des dizaines de contributeurs ont déjà aidé à améliorer l'outil.{' '}
				<a href="https://github.com/laem/cartes/issues">Pourquoi pas vous ?</a>.
			</p>
			<p>
				✉️ Pour nous contacter directement, c'est{' '}
				<a href="https://kont.me/contact">par ici</a>.
			</p>
			<Privacy />
			<CTA>Tester Cartes</CTA>
		</PresentationWrapper>
	)
}

const Blockquote = styled.blockquote`
	line-height: 1rem;
	margin-bottom: 1rem;
	border: 1px dashed var(--color);
	padding: 0.4rem;
	font-size: 80%;
	border-radius: 0.2rem;
`

const Iframe = styled.iframe`
	width: 20rem;
	height: 36rem;
	margin: 0 auto;
	margin-bottom: 5vh;
	display: block;
	border-radius: 1rem;
	border: 3px solid var(--darkColor);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
		rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`
