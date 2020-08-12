import { Dictionary } from "library/types"

export interface CockpitRequestOptions {

	filter?: Dictionary<any>
	fields?: Dictionary<number|undefined>
	limit?: number
	skip?: number
	sort?: Dictionary<number|undefined>
	populate?: boolean
	lang?: string

}