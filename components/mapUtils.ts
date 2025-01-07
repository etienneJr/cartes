import { useMediaQuery } from 'usehooks-ts'
import { useDimensions } from './react-modal-sheet/hooks'
import { snapPoints } from '@/app/ModalSheet'
import { mediaThreshold } from '@/app/ModalSwitch'

export const goodIconSize = (zoom, factor) => {
	const size = Math.max(0, (factor || 1) * 3.5 * zoom - 16) // I have a doctorate in zoom to icon size study
	return size
}

export const mapLibreBboxToOverpass = (bbox) => [
	bbox[0][1],
	bbox[0][0],
	bbox[1][1],
	bbox[1][0],
]

export const useComputeMapPadding = (trackedSnap, searchParams) => {
	const { height } = useDimensions()
	const isSideSheet = useMediaQuery(mediaThreshold)
	const sideSheetProbablySmall =
		isSideSheet && !Object.keys(searchParams).length

	if (!isSideSheet) {
		const snapValue = snapPoints[trackedSnap],
			bottom =
				snapValue < 0
					? height + snapValue
					: snapValue < 1
					? height * snapValue
					: snapValue
		const padding = { bottom }
		return padding
	} else {
		const padding = {
			left: sideSheetProbablySmall ? 0 : 400, //  rough estimate of the footprint in pixel of the left sheet on desktop; should be made dynamic if it ever gets resizable (a good idea)
		}

		console.log('indigo padding', padding)
		return padding
	}
}
