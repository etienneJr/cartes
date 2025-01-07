import { styled } from 'next-yak'
import Content from './Content'

export default function SideSheet(props) {
	return (
		<SideSheetWrapper>
			<Content {...props} sideSheet={true} />
		</SideSheetWrapper>
	)
}

const SideSheetWrapper = styled.div`
	position: absolute;
	top: 2vh;
	left: 1vw;
	z-index: 10;
	background-color: var(--lightestColor2) !important;
	width: 26rem;
	padding: 0.4rem 0.6rem;
	border-radius: 0.6rem;
	max-height: 80vh;
	max-width: 45vh;
	overflow: scroll;
	--shadow-color: 217deg 49% 38%;
	--shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.29),
		0.7px 1.3px 1.7px -0.6px hsl(var(--shadow-color) / 0.29),
		1.3px 2.6px 3.3px -1.2px hsl(var(--shadow-color) / 0.29),
		2.6px 5.2px 6.5px -1.9px hsl(var(--shadow-color) / 0.29),
		5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.29);
	box-shadow: var(--shadow-elevation-medium);
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`
