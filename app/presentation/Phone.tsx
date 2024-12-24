import { styled } from 'next-yak'

// Taken from here https://devicescss.xyz/phones.html#samsung-galaxy-s8
export default function Phone({ imgSrc }) {
	return (
		<Wrapper className="device device-galaxy-s8 device-blue">
			<div className="device-frame">
				<img className="device-screen" src={imgSrc} />
			</div>
			<div className="device-stripe"></div>
			<div className="device-header"></div>
			<div className="device-sensors"></div>
			<div className="device-btns"></div>
			<div className="device-power"></div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	transform: scale(0.6);
`
