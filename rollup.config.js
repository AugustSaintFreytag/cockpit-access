import typescript from "@rollup/plugin-typescript"
import typescriptPaths from "rollup-plugin-typescript-paths"

export default {
	input: "src/index.ts",
	output: [
		{
			file: "./dist/bundle.js",
			format: "cjs",
			exports: "named",
			sourcemap: true
		}
	],
	plugins: [
		typescript(),
		typescriptPaths()
	]
}