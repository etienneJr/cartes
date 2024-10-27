import franceStyle from '@/app/styles/france'

export async function GET(request: Request) {
	return Response.json(franceStyle(false))
}
