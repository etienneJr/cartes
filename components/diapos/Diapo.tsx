import { css } from 'next-yak'

export default function Diapo({ children }) {
	return (
		<div
			css={css`
				height: 100vh;
			`}
		>
			{children}
		</div>
	)
}
