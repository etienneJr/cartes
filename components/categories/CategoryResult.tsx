import Image from 'next/image'
import categoryColors from '@/app/categoryColors.yaml'
import Link from 'next/link'
import { buildAllezPart } from '@/app/SetDestination'
import { encodePlace } from '@/app/utils'

export default function CategoryResult({ result, setSearchParams }) {
	console.log('indigo test', result)
	const {
		tags: { name, description },
		category,
		type: featureType,
		id,
		lat,
		lon,
	} = result

	const url = setSearchParams(
		{
			allez: buildAllezPart(name, encodePlace(featureType, id), lon, lat),
		},
		true
	)
	return (
		<Link
			href={url}
			css={`
				text-decoration: none;
				color: inherit;
			`}
		>
			<div
				css={`
					border-radius: 0.3rem;
					background: white;
					margin: 0.4rem 0;
					padding: 0.6rem 0.6rem;
					header {
						display: flex;
						align-items: center;
						h2 {
							margin: 0;
							margin-left: 0.4rem;
							font-weight: bold;
							font-size: 90%;
						}
					}
				`}
			>
				<header>
					<div
						css={`
							background: ${categoryColors[category.category]};
							border-radius: 2rem;
							width: 1.6rem;
							height: 1.6rem;
							display: flex;
							align-items: center;
							justify-content: center;
							img {
								width: 1rem;
								height: auto;
								filter: invert(1);
							}
						`}
					>
						<Image
							src={
								category.icon.startsWith('http')
									? category.icon
									: '/icons/' + category.icon + '.svg'
							}
							width="10"
							height="10"
							alt={'Icône pour la catégorie ' + category.name}
						/>{' '}
					</div>
					<h2>{name}</h2>
					<p>{description}</p>
				</header>
			</div>
		</Link>
	)
}
