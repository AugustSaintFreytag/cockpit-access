import { Dictionary } from "@/library/types";

export default interface CockpitRequestOptions {

	filter?: Dictionary<any>
	fields?: Dictionary<number|undefined>
	limit?: number
	skip?: number
	sort?: Dictionary<number|undefined>
	populate?: boolean
	lang?: string

}