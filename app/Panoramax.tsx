import useSetSearchParams from '@/components/useSetSearchParams'
import { debounce } from '@/components/utils/utils'
import panoramaxIcon from '@/public/panoramax.svg'
import { Viewer } from '@panoramax/web-viewer'
import '@panoramax/web-viewer/build/index.css'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PanoramaxLink, Wrapper } from './PanoramaxUI'
import { ModalCloseButton } from './UI'

const servers = {
	meta: 'https://api.panoramax.xyz/api',
	ign: 'https://panoramax.ign.fr/api',
	osm: 'https://panoramax.openstreetmap.fr/api',
}

export default function Panoramax({ id, onMove }) {
	const ref = useRef()
	const [viewer, setViewer] = useState(null)

	const setSearchParams = useSetSearchParams()

	const onRotate = (e) => {
		console.log('panoramax event rotated', e)
		onMove((position) => ({
			...position,
			angle: e.detail.x,
		}))
	}
	const debouncedOnRotate = debounce(100, onRotate)

	useEffect(() => {
		if (!ref || !ref.current || viewer || !id) return
		console.log('purple will create panoramax instance', { viewer, id })
		const panoramax = new Viewer(
			ref.current, // Div ID
			servers.meta,
			{
				selectedPicture: id,
				map: false,
			} // Viewer options
		)
		setViewer(panoramax)
		console.log('panoramax event', panoramax)
		panoramax['sequence-stopped'] = (e) => console.log('panoramax event', e)
		panoramax.addEventListener('psv:view-rotated', debouncedOnRotate)
		panoramax.addEventListener('psv:picture-loading', (e) => {
			console.log('panoramax event loading', e)
			const { lat, lon } = e.detail
			onMove((position) => ({
				...position,
				longitude: lon,
				latitude: lat,
				angle: e.detail.x,
			}))
		})

		return () => {
			if (viewer) viewer.destroy()
		}
	}, [ref, viewer, setViewer, id, debouncedOnRotate])

	console.log('panoramax id', id)
	useEffect(() => {
		console.log('should set new panoramax picture id', id)
		if (!viewer || !id) return

		viewer.select(null, id)
	}, [id, viewer])

	if (!id) return null
	return (
		<Wrapper>
			<div ref={ref} />
			<PanoramaxLink
				href="https://panoramax.fr"
				target="_blank"
				title="Images de rue grâce au projet public Panoramax"
			>
				<Image src={panoramaxIcon} alt="Logo du projet Panoramax" />
			</PanoramaxLink>
			<ModalCloseButton
				onClick={() => {
					setSearchParams({ panoramax: undefined })

					setTimeout(() => {
						onMove(null)
						setViewer(null)
					}, 300)
				}}
			/>
		</Wrapper>
	)
}
