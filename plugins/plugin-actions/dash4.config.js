const { PluginActions } = require('./build/server');

const configLink = {
	actions: [
		{
			type: 'link',
			href: 'http://localhost:6006',
			title: 'Storybook',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
		},
		{
			type: 'link',
			href: 'http://localhost:6008',
			title: 'Development environment',
			icon: 'compare',
		},
		{
			type: 'link',
			href: 'http://localhost:6008',
			title: 'Staging environment',
			icon: 'devices',
		},
	],
};
const configTeaser = {
	actions: [
		{
			type: 'teaser',
			href: 'http://localhost:6006',
			title: 'Storybook',
			subtitle:
				'Build bulletproof UI components faster. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
			link: configLink.actions[0],
		},
		{
			type: 'teaser',
			href: 'http://localhost:6006',
			title: 'Storybook',
			subtitle:
				'Build bulletproof UI components faster. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
			link: configLink.actions,
		},
		{
			type: 'teaser',
			href: 'http://localhost:6008',
			title: 'Development environment',
			icon: 'compare',
			link: configLink.actions,
		},
	],
};

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginActions({
							title: 'Links',
							...configLink,
						}),
						new PluginActions({
							title: 'Links',
							...configLink,
							dark: true,
						}),
					],
					[
						new PluginActions({
							actions: [configTeaser.actions[0]],
						}),
						new PluginActions({
							actions: [configTeaser.actions[0]],
							dark: true,
						}),
					],
					[
						new PluginActions({
							actions: [configTeaser.actions[1]],
						}),
						new PluginActions({
							actions: [configTeaser.actions[1]],
							dark: true,
						}),
					],
					[
						new PluginActions({
							actions: [configTeaser.actions[2]],
						}),
						new PluginActions({
							actions: [configTeaser.actions[2]],
							dark: true,
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
