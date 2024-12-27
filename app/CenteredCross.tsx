import { styled } from 'next-yak'
import Image from 'next/image'

export default function CenteredCross() {
	return (
		<Wrapper>
			<Image src="/cross.svg" alt="Centre de la carte" width="10" height="10" />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	img {
		width: 1rem;
		height: auto;
	}
	z-index: 10;
	filter: drop-shadow(0 0 0.75rem white);
`
