import { compareDesc } from 'date-fns'
import { blogArticles } from './blogArticles'
import Blog from './Blog'

const title = `Le blog - Cartes`
export const description =
	"Découvrez l'histoire, les nouveautés et le futur de Cartes.app"

export const metadata: metadata = {
	title,
	description,
}

const Page = () => {
	const articles = blogArticles.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	)
	return <Blog articles={articles} />
}

export default Page
