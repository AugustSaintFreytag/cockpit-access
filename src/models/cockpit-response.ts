import { Dictionary } from "library/types"
import { CockpitEntry } from "models/cockpit-entry"
import { CockpitFieldDefinition } from "models/cockpit-field-definition"

export type AnyCockpitResponse = any

export interface CockpitCollectionResponse extends AnyCockpitResponse {

	total: number,
	fields: Dictionary<CockpitFieldDefinition>
	entries: CockpitEntry[]

}

export interface CockpitSingletonResponse extends AnyCockpitResponse {

	[key: string]: any

}

export type CockpitImageResponse = string