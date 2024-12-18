'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const TrackUser = dynamic(() => import('@/components/analytics/TrackUser'), {
	ssr: false,
})

export default function TrackUserClient() {
	return (
		<Suspense>
			<TrackUser />
		</Suspense>
	)
}
