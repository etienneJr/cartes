import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function useUUID() {
	const [uuid, setUuid] = useLocalStorage('uuid', null, {
		initializeWithValue: false,
	})
	useEffect(() => {
		if (uuid) return
		setUuid(crypto.randomUUID())
	}, [uuid, setUuid])
	return uuid
}
