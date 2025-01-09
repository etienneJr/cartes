import Contribution from '@/app/blog/Contribution'
import { dateCool } from '@/app/blog/utils'
import ArticleWrapper, { BackToBlogLink } from '@/components/ArticleUI'
import { styled } from 'next-yak'
import Image from 'next/image'

export default function Issue({ issue, comments, pr }) {
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
					{pr && (
						<section>
							<p>⚙️ Ceci est une proposition de changement de code.</p>
							<p>
								{' '}
								Rendez-vous sur <a href={pr.html_url}>sa page Github</a> pour
								l'osculter.
							</p>
						</section>
					)}
					<Comment markdown={issue.markdownBody} user={issue.user} />
					{comments && (
						<Comments>
							{comments.map((comment) => (
								<li key={comment.id}>
									<Comment
										markdown={comment.markdownBody}
										user={comment.user}
									/>
								</li>
							))}
						</Comments>
					)}
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

const Comments = styled.ol`
	list-style-type: none;
	padding-left: 0;
`

const issueHashesToLinks = (markdown) => {
	const match = markdown.match(/\#(\d+)/g)

	if (!match) return markdown
	console.log('indigo', match)
	const number = match[0].split('#')[1]

	return markdown.replace(
		number,
		`<a href="/documentation/tickets/${number}">${number}</a>`
	)
}

const Comment = ({ user, markdown }) => (
	<CommentWrapper>
		<header>
			<Image
				src={user.avatar_url}
				width="40"
				height="40"
				alt={'Avatar github de ' + user.login}
			/>
			<a href={user.html_url}>{user.login}</a>
		</header>
		<div
			dangerouslySetInnerHTML={{
				__html: markdown
					? issueHashesToLinks(markdown)
					: '<small style="color: gray; font-style: italic">commentaire vide</small>',
			}}
		/>

		{}
	</CommentWrapper>
)
const CommentWrapper = styled.div`
	background: var(--lightestColor2);
	border: 1px solid var(--lighterColor);
	border-radius: 0.3rem;
	padding: 0.4rem 0.6rem 0;
	margin: 0.6rem 0;
	header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.4rem;
		a  {
			text-decoration: none;
		}
		img {
			width: 2rem !important;
			height: 2rem !important;
			object-fit: cover;
			border-radius: 1rem;
			margin: 0;
		}
	}
	img {
		max-width: 90% !important;
		margin: 0.6rem 0;
	}
	h1 {
		font-size: 160%;
		margin: 1rem 0 0.4rem;
		text-align: left;
	}
	overflow: hidden;
`
