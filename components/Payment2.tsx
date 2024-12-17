import React, { useState } from 'react'
import { styled } from 'next-yak'

const SubscriptionChoice = () => {
	const [selectedPlan, setSelectedPlan] = useState(null)

	const plans = [
		{
			id: 1,
			name: 'Basic',
			price: 'Free',
			features: ['Access to basic maps', 'Limited usage'],
		},
		{
			id: 2,
			name: 'Standard',
			price: '$9.99/month',
			features: ['Access to all maps', 'Unlimited usage', 'Basic support'],
		},
		{
			id: 3,
			name: 'Premium',
			price: '$19.99/month',
			features: [
				'Access to all maps',
				'Unlimited usage',
				'Priority support',
				'Exclusive features',
			],
		},
	]

	const handleSelectPlan = (planId) => {
		setSelectedPlan(planId)
	}

	return (
		<SubscriptionChoiceContainer>
			<Title>Choose Your Subscription Plan</Title>
			<PlansGrid>
				{plans.map((plan) => (
					<PlanCard
						key={plan.id}
						selected={selectedPlan === plan.id}
						onClick={() => handleSelectPlan(plan.id)}
					>
						<PlanName>{plan.name}</PlanName>
						<PlanPrice>{plan.price}</PlanPrice>
						<PlanFeatures>
							{plan.features.map((feature, index) => (
								<li key={index}>{feature}</li>
							))}
						</PlanFeatures>
					</PlanCard>
				))}
			</PlansGrid>
			{selectedPlan && (
				<SelectedPlanMessage>
					<p>
						You have selected the{' '}
						{plans.find((plan) => plan.id === selectedPlan).name} plan.
					</p>
				</SelectedPlanMessage>
			)}
		</SubscriptionChoiceContainer>
	)
}

const SubscriptionChoiceContainer = styled.div`
	padding: 16px;
`

const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 16px;
	color: #1d4ed8; /* Bleu foncé */
`

const PlansGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
`

const PlanCard = styled.div`
	border: 2px solid ${(props) => (props.selected ? '#2563EB' : '#93C5FD')}; /* Bleu ou Bleu clair */
	padding: 16px;
	border-radius: 8px;
	background-color: ${(props) =>
		props.selected
			? '#BFDBFE'
			: '#E0F7FA'}; /* Bleu légèrement foncé ou Bleu très clair */
	transition: background-color 0.3s, border-color 0.3s;
	cursor: pointer;
`

const PlanName = styled.h3`
	font-size: 1.25rem;
	font-weight: semibold;
	color: #1d4ed8; /* Bleu foncé */
`

const PlanPrice = styled.p`
	color: #2563eb; /* Bleu */
`

const PlanFeatures = styled.ul`
	list-style-type: disc;
	list-style-position: inside;
	color: #1e3a8a; /* Bleu très foncé */
`

const SelectedPlanMessage = styled.div`
	margin-top: 16px;
	color: #1d4ed8; /* Bleu foncé */
`

export default SubscriptionChoice
