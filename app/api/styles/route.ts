import franceStyle from '@/app/styles/france'

export async function GET(request: Request) {
	return Response.json(franceStyle(false, 'hexagone-plus'), {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	})
}
