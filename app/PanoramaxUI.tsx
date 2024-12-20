import { styled } from 'next-yak'

export const Wrapper = styled.section`
	height: 50vh;
	width: 96vw;
	top: 2vw;
	left: 2vw;
	position: fixed;
	z-index: 100;

	@media (min-width: 1000px) {
		width: 50vw;
		height: 90vh;
		top: 4vh;
		right: 4vw;
		left: auto;
	}
	> div {
		position: relative;
		height: 100%;
	}
	> :global(div.fullpage) {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: unset;
		width: unset;
		margin: 0;
	}
	:global(.gvs-loader) {
		border-radius: 0.6rem;
	}
	:global(.gvs-main) {
		border-radius: 0.6rem;
		overflow: hidden;
		--shadow-color: 54deg 16% 57%;
		--shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
			0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
			2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
			5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
		box-shadow: var(--shadow-elevation-medium);
	}
	/* https://gitlab.com/panoramax/clients/web-viewer/-/issues/152 */
	:global(.gvs-main) {
		height: 100%;
		.gvs-psv {
			height: 100%;
		}

		:global(#gvs-corner-main-top) {
			position: absolute;
			top: 0;
		}
		:global(#gvs-corner-main-bottom) {
			position: absolute;
			bottom: 0;
		}
	}
	> button {
		right: 0.3rem !important;
		img {
			opacity: 1;
		}
	}
`
export const PanoramaxLink = styled.a`
	z-index: 1000;
	position: absolute;
	bottom: 0.6rem;

	right: 4.3rem;
	img {
		vertical-align: bottom;
		width: 3rem;
		height: auto;
	}
	@media (max-width: 600px) {
		right: 0.6rem;
	}
`
