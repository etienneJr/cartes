import issuesResponse from '@/.next/static/github-issues.json'
import { sortBy } from '@/components/utils/utils'
import Issues from './Issues'

const issues = issuesResponse.data

const title = `La documenation - Cartes`,
	description = `Plongez dans la fabrique de Cartes`

export const metadata: metadata = {
	title,
	description,
}

const sortIssues = (attribute = 'created_at') =>
	sortBy((issue) => issue && issue[attribute])(issues).filter(Boolean)

//compareDesc(new Date(a.date), new Date(b.date))

const Page = () => {
	const articles = sortIssues()

	return <Issues issues={articles} />
}

export default Page
