import useSetSearchParams from '@/components/useSetSearchParams'
import { styled } from 'next-yak'
import { useEffect } from 'react'
import { ElectionFilterLabel, ElectionFilters } from './ElectionsUI'
import { ModalCloseButton } from './UI'
import Candidates from './elections/Candidates'
import useCircoData from './elections/useCircoData'

export default function ({ searchParams, setSnap }) {
	const setSearchParams = useSetSearchParams()
	const { id_circo: idCirco, name, dep } = searchParams
	useEffect(() => {
		if (!idCirco) return
		setSnap(1)
	}, [idCirco])

	const candidates = useCircoData(idCirco)

	if (!idCirco) return <NoCircoYet filter={searchParams.filtre} />

	return (
		<Wrapper>
			<section>
				<ModalCloseButton
					title="Fermer l'encart circo"
					onClick={() => {
						console.log('will yo')
						setSearchParams({
							id_circo: undefined,
							dep: undefined,
							name: undefined,
						})
					}}
				/>
				<h3>Votre circonscription</h3>
				<div>
					<div>Nom : {name}</div>
					<div>Code : {idCirco}</div>
					<div>Département : {dep}</div>
				</div>
			</section>
			<Candidates data={candidates} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	> section {
		position: relative;
		margin-top: 1rem;
		h3 {
			margin-top: 0;
		}
		> div {
			background: white;
			padding: 0.2rem 0.6rem;
			border-radius: 0.4rem;
			border: 1px solid var(--lighterColor);
			width: fit-content;
		}
	}
`

const NoCircoYet = ({ filter }) => {
	const setSearchParams = useSetSearchParams()

	return (
		<NoCircoYetWrapper>
			<section>
				🗳️
				<p>
					Cliquez sur la carte pour voir les résultats de votre circonscription
					au premier tour des élections législatives 2024.
				</p>
			</section>
			<ElectionFilters>
				<li key={'elus'}>
					<ElectionFilterLabel>
						<input
							type="radio"
							checked={!filter || 'elus' === filter}
							onClick={() => setSearchParams({ filtre: 'elus' })}
						/>
						Candidats élus au 1er tour
					</ElectionFilterLabel>
				</li>
				<li key={'tete'}>
					<ElectionFilterLabel>
						<input
							type="radio"
							checked={'tete' === filter}
							onClick={() => setSearchParams({ filtre: 'tete' })}
						/>
						Le candidat en tête
					</ElectionFilterLabel>
				</li>
			</ElectionFilters>
		</NoCircoYetWrapper>
	)
}

const NoCircoYetWrapper = styled.section`
	position: relative;
	padding-top: 0.2rem;
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	img {
		margin-right: 1rem;
		width: 3rem;
		height: auto;
	}
`
