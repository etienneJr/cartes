import { styled } from 'next-yak'

export const RouteLi = styled.li`
	margin-top: 0.8rem;
	margin-bottom: 1.4rem;
	> div {
		display: flex;
		align-items: center;
		small {
			line-height: 1rem;
		}
	}
	> ul {
		display: flex;
		justify-content: end;
		list-style-type: none;
		li {
			margin-right: 0.6rem;
			border-right: 2px solid var(--lighterColor);
			padding-right: 0.6rem;
			line-height: 1rem;
			display: flex;
			align-items: center;
		}
		li:last-child {
			border-right: none;
		}
	}
`

export const RouteNameSpan = styled.span`
	display: flex;
	align-items: center;
	justify-content: start;
	img {
		height: 1.2rem;
		width: auto;
		margin-right: 0.2rem;
		opacity: 0.6;
	}
	small {
		strong {
			background: ${(p) => p.$backgroundColor};
			padding: 0 0.25rem;
			border-radius: 0.3rem;
			color: ${(p) => p.$color};
		}
		span {
			text-decoration: underline;
			text-decoration-color: ${(p) => p.$backgroundColor};
			text-decoration-thickness: 2px;
		}

		white-space: nowrap;
		width: 100%;
		overflow: scroll;
		touch-action: pan-x;
		height: fit-content;
		&::-webkit-scrollbar {
			display: none;
		}
		scrollbar-width: none;
	}
`
