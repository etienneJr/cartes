export default function Issues({ issues }) {
	return (
		<ol>
			{issues.map((issue, i) => (
				<li key={issue.id}>
					{issue.title} #{issue.number}
				</li>
			))}
		</ol>
	)
}
