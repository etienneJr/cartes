 import Image from 'next/image'
 import categoryColors from '@/app/categoryColors.yaml'
 import Link from 'next/link'
 import { buildAllezPart } from '@/app/SetDestination'
 import { encodePlace } from '@/app/utils'
 import { computeHumanDistance } from '@/app/RouteRésumé'
 import { OpenIndicator, getOh } from '@/app/osm/OpeningHours'
 import opening_hours from 'opening_hours'
 import { computeRoseDirection } from '../SimilarNodes'
 
 export default function CategoryResult({ result, setSearchParams }) {
 	console.log('indigo test', result)
 	const {
 		tags: { name, description, opening_hours: oh },
 		category,
 		type: featureType,
 		id,
 		lat,
 		lon,
 		distance,
 		bearing,
 	} = result
 
 	const url = setSearchParams(
 		{
 			allez: buildAllezPart(name, encodePlace(featureType, id), lon, lat),
 		},
 		true
 	)
 
 	const humanDistance = computeHumanDistance(distance * 1000)
 	const { isOpen } = oh ? getOh(oh) : {}
 	const isOpenByDefault = category['open by default']
 	const roseDirection = computeRoseDirection(bearing)
 	return (
 		<Link
 			href={url}
 			css={css`
 				text-decoration: none;
 				color: inherit;
 			`}
 		>
 			<div
 				css={css`
 					border-radius: 0.3rem;
 					background: white;
 					margin: 0.4rem 0;
 					padding: 0.6rem 0.6rem;
 					header {
 						h2 {
 							margin: 0;
 							margin-left: 0.4rem;
 							font-weight: bold;
 							font-size: 90%;
 						}
 					}
 					header {
 						display: flex;
 						justify-content: space-between;
 					}
 				`}
 			>
 				<header>
 					<div
 						css={css`
 							display: flex;
 							align-items: center;
 						`}
 					>
 						<div
 							css={css`
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
 					</div>
 					{!isOpenByDefault &&
 						(oh == null ? (
 							<span
 								css={css`
 									display: inline-block;
 									width: 1.8rem;
 								`}
 							></span>
 						) : (
 							<OpenIndicator isOpen={isOpen === 'error' ? false : isOpen} />
 						))}
 				</header>
 				{description && <p>{description}</p>}
 				<small
 					css={css`
 						text-align: right;
 					`}
 				>
 					à {humanDistance[0]} {humanDistance[1]} vers {roseDirection}
 				</small>
 			</div>
 		</Link>
 	)
 }
