import issues from '@/.next/static/github-issues.json'
import { sortBy } from '@/components/utils/utils'
import Issues from './Issues'
import { description, title } from './metadata'

export const metadata: metadata = {
	title,
	description,
}

const sortIssues = (attribute = 'created_at') => {
	const sorted = sortBy((issue) => issue && issue[attribute])(issues).filter(
		Boolean
	)
	return [...sorted].reverse()
}

const Page = () => {
	const articles = sortIssues()

	return <Issues issues={articles} />
}

export default Page
