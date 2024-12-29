import { writeFileSync } from 'fs'
import { Octokit } from '@octokit/rest'

import { micromark } from 'micromark'
import { gfmHtml, gfm } from 'micromark-extension-gfm'

const octokit = new Octokit({ auth: process.env.GITHUB_CLASSIC_TOKEN })

// Credits :
// https://notebook.lachlanjc.com/2022-08-18_set_up_rss_with_contentlayer_and_mdx
//
const domain = 'https://cartes.app'

export async function downloadIssues() {
	const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
		owner: 'cartesapp',
		repo: 'cartes',
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})

	const withMarkdown = response.data
		.map((issue) => {
			const { body } = issue

			if (!body) return issue
			const markdownBody = micromark(issue.body, {
				extensions: [gfm()],
				htmlExtensions: [gfmHtml()],
			})

			return {
				...issue,
				markdownBody,
			}
		})
		.filter(Boolean)

	writeFileSync(
		'./.next/static/github-issues.json',
		JSON.stringify({ ...response, data: withMarkdown })
	)
	console.log('💡 Github issues written in .next/static/')
}

downloadIssues()
