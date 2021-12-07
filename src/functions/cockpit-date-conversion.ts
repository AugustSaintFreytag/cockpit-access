export function dateFromString(string: string): Date | undefined {
	const date = new Date(string)

	if (isNaN(date.getDate())) {
		return undefined
	}

	return date
}

export function dateFromTimestamp(timestamp: number): Date | undefined {
	const date = new Date(timestamp * 1000)

	if (isNaN(date.getDate())) {
		return undefined
	}

	return date
}

export function stringFromDate(date: Date): string | undefined {
	if (isNaN(date.valueOf())) {
		return undefined
	}

	return `${date.getFullYear()}-${stringWithLeadingZero(date.getMonth() + 1)}-${date.getDate()}`
}

function stringWithLeadingZero(number: number): string {
	if (number > 9) {
		return String(number)
	}

	return "0" + String(number)
}
