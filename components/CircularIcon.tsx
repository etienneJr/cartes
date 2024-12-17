import { css, styled } from 'next-yak'

const defaultSize = '2rem'
export default function CircularIcon({
	src,
	alt,
	background,
	givenSize,
	padding,
	black,
	...rest
}) {
	const size = givenSize || defaultSize
	return (
		<Wrapper $size={size} $hasOnClick={rest.onClick}>
			<div />
			<img src={src} alt={alt} width="100" height="100" />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	width: ${(p) => p.$size};
	height: ${(p) => p.$size};
	cursor: ${(p) => (p.$hasOnClick ? 'pointer' : 'normal')};
	div {
		position: absolute;
		background: ${(p) => p.$background || 'transparent'};
		border-radius: 3rem;
		width: 100%;
		height: 100%;
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		${(p) =>
			p.$black
				? ''
				: css`
						filter: invert(1);
				  `}
		padding: ${(p) => (p.$padding ? padding : `0`)}
	}
`
