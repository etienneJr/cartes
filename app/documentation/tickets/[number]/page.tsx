import issues from '@/.next/static/github-issues.json'
import Issue from '../Issue'

const Page = async ({ params }) => {
	const { number } = await params

	const issue = issues.find((issue) => issue.number == number)
	return <Issue issue={issue} />
}

export default Page
