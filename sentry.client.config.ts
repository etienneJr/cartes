// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: 'https://3b048e28d2ce4b6192bcfeb6a9dae45b@pb.cartes.app/1',

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
})
