import { PaymentBannerWrapper } from '@/components/PaymentUI'
import TrackUserClient from '@/components/analytics/TrackUserClient'
import starGradient from '@/public/star-fill-gradient.svg'
import { css } from 'next-yak'
import Image from 'next/image'
import Link from 'next/link'

export default function PaymentBanner({ parameter }) {
	return (
		<PaymentBannerWrapper>
			<TrackUserClient />
			<Link href={!parameter ? '/?abonnement=oui' : '/'}>
				<Image
					title="Souscrire"
					src={starGradient}
					alt="Une étoile dégradée de bleu"
					css={css`
						width: 1.6rem;
						height: auto;
					`}
				/>
			</Link>
		</PaymentBannerWrapper>
	)
}
