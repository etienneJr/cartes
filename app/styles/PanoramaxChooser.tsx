import Image from 'next/image'
import panoramaxIcon from '@/public/panoramax-simple.svg'
import panoramaxIconChecked from '@/public/panoramax-simple-choisi.svg'

export default function ({ searchParams, setSearchParams, setZoom, zoom }) {
	return (
		<section
			css={`
				padding: 0 1rem;
				label {
					display: flex;
					align-items: center;
					input {
						margin-right: 0.4rem;
					}
					cursor: pointer;
					img {
						width: 1.3rem;
						margin-bottom: 0.15rem;
						height: auto;
						margin-right: 0.2rem;
						vertical-align: middle;
					}
				}
			`}
		>
			<label title="Afficher sur la carte les photos de rue Panoramax disponibles">
				<input
					type="checkbox"
					checked={searchParams.panoramax != null || searchParams.rue === 'oui'}
					onChange={() => {
						if (searchParams.rue === 'oui') setSearchParams({ rue: undefined })
						else {
							if (zoom < 7) setZoom(7)
							setSearchParams({ rue: 'oui' })
						}
					}}
				/>
				<span>
					<Image src={panoramaxIconChecked} alt="Logo du projet Panoramax" />
					Photos de rue
				</span>
			</label>
		</section>
	)
}
