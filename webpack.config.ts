import path from "path"
import { Configuration, Rule } from "webpack"

// Paths

const sourceDirectoryPath = path.resolve(__dirname, "src")
const outputDirectoryPath = path.resolve(__dirname, "dist")
const indexFilePath = path.resolve(sourceDirectoryPath, "index.ts")

// Rules

const typeScriptLoaderRule: Rule = {
	test: /\.ts$/,
	use: "ts-loader",
	exclude: /node_modules/
}

// Configuration

const configuration: Configuration = {
	mode: "development",
	entry: indexFilePath,
	module: {
		rules: [typeScriptLoaderRule]
	},
	resolve: {
		extensions: [".ts", ".js"],
		modules: ["node_modules"],
		alias: {
			"@": sourceDirectoryPath
		}
	},
	output: {
		filename: "index.js",
		path: outputDirectoryPath
	}
}

export default configuration