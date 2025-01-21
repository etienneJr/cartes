import { useEffect } from 'react'

export default function () {
	useEffect(() => {
		throw Error('ouhlala c moche')
	}, [])
}
