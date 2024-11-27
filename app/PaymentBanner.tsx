import css from '@/components/css/convertToJs'
import starGradient from '@/public/star-fill-gradient.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function PaymentBanner({ parameter }) {
	return (
		<section
			style={css`
				position: fixed;
				top: 0.4rem;
				left: 0.4rem;
				z-index: 10;
				background: white;
				padding: 0 0.1rem;
				border-radius: 0.3rem;
				box-shadow: rgba(0, 0, 0, 0.3) 0px -2px 16px;
				color: white;
				line-height: 1.2rem;
			`}
		>
			<Link href={!parameter ? '/?abonnement=oui' : '/'}>
				<Image
					title="Souscrire"
					src={starGradient}
					alt="Une étoile dégradée de bleu"
					style={css`
						width: 1.6rem;
						height: auto;
					`}
				/>
			</Link>
		</section>
	)
}
