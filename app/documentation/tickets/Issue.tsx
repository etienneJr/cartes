import Contribution from '@/app/blog/Contribution'
import ArticleWrapper, { BackToBlogLink } from '@/components/ArticleUI'
import Image from 'next/image'
import OtherArticles from '@/app/blog/OtherArticles'
import { dateCool, getLastEdit } from '@/app/blog/utils'

export default function Issue({ issue }) {
	return (
		<div>
			<ArticleWrapper>
				<BackToBlogLink href="/documentation/tickets/">
					← Retour aux issues
				</BackToBlogLink>
				<header>
					<h1 dangerouslySetInnerHTML={{ __html: issue.title }} />

					<small>
						publié le{' '}
						<time dateTime={issue.created_at}>
							{dateCool(issue.updated_at)}
						</time>
						{issue.created_at.split('T')[0] !==
							issue.updated_at.split('T')[0] && (
							<span>
								, mis à jour{' '}
								<time dateTime={issue.updated_at}>
									{dateCool(issue.updated_at)}
								</time>
							</span>
						)}
					</small>
					<br />
					<div dangerouslySetInnerHTML={{ __html: issue.markdownBody }} />
					<hr />
				</header>
				<Contribution
					issueNumber={issue.number}
					text="✏️ Participer à la discussion"
				/>
				{/* TODO
				<OtherArticles excludeUrl={issue.url} />
				*/}
			</ArticleWrapper>
		</div>
	)
}
