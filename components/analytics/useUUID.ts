import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function useUUID() {
	const [uuid, setUuid] = useLocalStorage('uuid', null)

	useEffect(() => {
		if (uuid) return
		setUuid(crypto.randomUUID())
	}, [uuid, setUuid])
	return uuid
}
