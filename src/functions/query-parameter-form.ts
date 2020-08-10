import { Dictionary, URLComponent } from "@/library/types"

export type ParameterDictionary = Dictionary<string|number|boolean>

export function joinedParameters(parameters: ParameterDictionary): URLComponent {
	const keys = Object.keys(parameters)

	return keys.reduce((pairs: string[], parameterKey: string) => {
		const parameterValue = preparedParameterValue(parameters[parameterKey])

		if (parameterValue === undefined) {
			return pairs
		}

		pairs.push(`${parameterKey}=${encodeURIComponent(parameterValue)}`)
		return pairs
	}, []).join("&")
}

function preparedParameterValue(value: string|number|boolean): string|undefined {
	if (typeof value === "string" || typeof value === "number") {
		return String(value)
	}

	if (typeof value === "boolean") {
		return value ? "1" : "0"
	}

	return undefined
}