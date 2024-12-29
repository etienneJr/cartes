import issues from '@/public/github-issues.json'
import Issue from '../Issue'
import { micromark } from 'micromark'
import { gfmHtml, gfm } from 'micromark-extension-gfm'

const Page = async ({ params }) => {
	const { number } = await params

	const issue = issues.find((issue) => issue.number == number)

	if (issue.comments === 0) return <Issue issue={issue} />

	const request = await fetch(
		`https://api.github.com/repos/cartesapp/cartes/issues/${number}/comments`
	)
	if (!request.ok) return <Issue issue={issue} />

	const json = await request.json()

	if (!json || !json.length) return <Issue issue={issue} />

	const comments = json.map((comment) => {
		const markdownBody = convertIssueLinksToInternal(
			micromark(comment.body, {
				extensions: [gfm()],
				htmlExtensions: [gfmHtml()],
			})
		)
		return { ...comment, markdownBody }
	})

	return <Issue issue={issue} comments={comments} />
}

export const convertIssueLinksToInternal = (body) =>
	body.replace(
		/https:\/\/github\.com\/cartesapp\/cartes\/issues\//g,
		'/documentation/tickets/'
	)

export default Page
