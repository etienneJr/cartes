import issues from '@/public/github-issues.json'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import Issue from '../Issue'

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const { number } = await params

	const issue = issues.find((issue) => issue.number == number)
	if (!issue) return null

	const { body } = issue
	const description = body && body.split(' ').slice(0, 50).join(' ')

	return {
		title: issue.title,
		description,
	}
}

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
