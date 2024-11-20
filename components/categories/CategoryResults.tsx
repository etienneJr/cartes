import Link from 'next/link'
import useSetSearchParams from '../useSetSearchParams'
import Image from 'next/image'
import closeIcon from '@/public/close.svg'

export default function CategoryResults({ resultsEntries }) {
	const setSearchParams = useSetSearchParams()
	return (
		<section
			css={`
				display: flex;
				justify-content: space-between;
				img {
					width: 0.9rem;
					height: auto;
				}
			`}
		>
			<div>
				{resultsEntries.map(([k, v], i) => (
					<>
						<span>
							<span>{v.length}</span> <span>{k.toLowerCase()}</span>
						</span>
						{i < resultsEntries.length - 1 && ', '}
					</>
				))}
			</div>
			{resultsEntries.length > 0 && (
				<Link href={setSearchParams({ cat: undefined }, true)}>
					<Image src={closeIcon} alt="Fermer" />
				</Link>
			)}
		</section>
	)
}
