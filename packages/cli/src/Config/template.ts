interface IOptions {
	imports: string;
	port: number;
	tabs: string;
}

export default ({ imports, port, tabs }: IOptions) => `
/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
${imports}

async function getConfig() {
	return { 
		port: ${port},
		tabs: ${tabs}
	};
}

module.exports = getConfig;
`;
