import { styled } from 'next-yak'
export const CalendarInput = styled.input`
	cursor: pointer;
	margin-top: 0.6rem;
	display: block;
	margin: auto 0 auto auto;
`

export const CalendarContent = styled.div`
	max-width: 100%;
	white-space: nowrap;
	overflow: scroll;
`

export const CalendarUl = styled.ul`
	margin-top: 0.6rem;
	display: flex;
	width: auto;
	scrollbar-width: none;
	list-style-type: none;
	text-align: center;
	li {
		padding: 0;
	}
	& > li > strong {
		font-size: 90%;
		background: var(--darkColor);
		color: var(--lightestColor);
		width: 2.6rem;
		display: block;
		border-right: 2px solid var(--lighterColor);
	}
	& > li:nth-child(even) {
		background: var(--lighterColor);
	}

	ul {
		display: flex;
		list-style-type: none;
		flex-direction: column;
	}
`
