import { useLocalStorage } from 'usehooks-ts'
import { pointHash } from './BookmarkButton'
import Image from 'next/image'
import { SoloTags, processTags } from '@/components/Tags'
import { ModalCloseButton } from './UI'
import useSetSearchParams from '@/components/useSetSearchParams'
import { useState } from 'react'
import { buildAddress } from '@/components/osm/buildAddress'
import { styled } from 'next-yak'

export default function Favoris() {
	const setSearchParams = useSetSearchParams()
	const [bookmarks, setBookmarks] = useLocalStorage(
		'bookmarks',
		[],

		{
			initializeWithValue: false,
		}
	)
	console.log('purple', bookmarks)
	return (
		<Section>
			<ModalCloseButton
				title="Fermer l'encart favoris"
				onClick={() => {
					setSearchParams({ favoris: undefined })
				}}
			></ModalCloseButton>
			<h2>Gérer mes favoris</h2>

			<h3>Adresses</h3>
			<ul>
				{bookmarks.map((bookmark) => (
					<Bookmark
						key={pointHash(bookmark)}
						bookmark={bookmark}
						setBookmarks={setBookmarks}
					/>
				))}
			</ul>
			<h3>Itinéraires</h3>
			<p>
				<small>À venir.</small>
			</p>
		</Section>
	)
}

const Section = styled.section`
	position: relative;
	ul {
		padding-left: 0.6rem;
		li {
			display: flex;
			align-items: center;
		}
	}
`

const Bookmark = ({ bookmark, setBookmarks }) => {
	const address = buildAddress(bookmark.properties, true)
	const name = bookmark.properties.customName || bookmark.properties.name
	const [edition, setEdition] = useState(false)
	const updateBookmark = (edition) =>
		setBookmarks((bookmarks) =>
			bookmarks.map((point) => {
				if (point.geometry.type !== 'Point') return true
				const thisOne = pointHash(point) === pointHash(bookmark)
				if (thisOne)
					return { ...point, properties: { ...point.properties, ...edition } }
				else return point
			})
		)

	return (
		<Li key={pointHash(bookmark)}>
			{!edition ? (
				name ? (
					<div>
						<SoloTags
							tags={processTags(bookmark.properties)[1]}
							iconsOnly={true}
						/>
						<span>{name}</span>
					</div>
				) : address ? (
					<address>{address}</address>
				) : (
					<div>
						Point <small>{pointHash(bookmark)}</small>
					</div>
				)
			) : (
				<div>
					<input
						type="text"
						value={edition.customName}
						onChange={(e) => setEdition({ customName: e.target.value })}
						placeholder="Le nouveau nom"
					/>
				</div>
			)}
			<Buttons>
				{!edition ? (
					<button
						title="Donner un autre nom au favori"
						onClick={() => setEdition(true)}
					>
						<Image
							src="/crayon.svg"
							width="10"
							height="10"
							alt="Icône crayon"
						/>
					</button>
				) : (
					<>
						<button
							title="Valider le nouveau nom du favori"
							onClick={() => {
								updateBookmark(edition)
								setEdition(false)
							}}
						>
							<Image
								src="/check-circle.svg"
								width="10"
								height="10"
								alt="Icône coche"
							/>
						</button>
						<button
							title="Annuler la modification du nom du favori"
							onClick={() => {
								setEdition(false)
							}}
						>
							<Image
								src="/close-circle.svg"
								width="10"
								height="10"
								alt="Icône annuler"
							/>
						</button>
					</>
				)}
				<button
					title="Supprimer ce favori"
					onClick={() =>
						setBookmarks((bookmarks) =>
							bookmarks.filter((point) => {
								if (point.geometry.type !== 'Point') return true
								return pointHash(point) !== pointHash(bookmark)
							})
						)
					}
				>
					<Image src="/trash.svg" width="10" height="10" alt="Icône poubelle" />
				</button>
			</Buttons>
		</Li>
	)
}
const Li = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.3rem 0;
	margin-bottom: 0.4rem;
	border-bottom: 1px solid var(--lightestColor);
	> div {
		display: flex;
		align-items: center;
	}
	address {
		line-height: 1.2rem;
		font-style: normal;
	}
`

const Buttons = styled.div`
	display: flex;
	justify-content: end;
	button {
		line-height: 1rem;
		img {
			width: 1.2rem;
			height: auto;
		}
	}
`
