import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "npm run build && npm run preview",
		port: 4173
	},
	use: {
		testIdAttribute: "data-testid"
	},
	testDir: "tests"
};

export default config;
