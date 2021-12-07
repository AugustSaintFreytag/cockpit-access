import { Dictionary } from "~/library/types"
import { CockpitRecord } from "~/models/cockpit-record"
import { CockpitFieldDefinition } from "~/models/cockpit-field-definition"

export type AnyCockpitResponse = any

export interface CockpitCollectionResponse extends AnyCockpitResponse {
	total: number
	fields: Dictionary<CockpitFieldDefinition>
	entries: CockpitRecord[]
}

export interface CockpitSingletonResponse extends AnyCockpitResponse {
	[key: string]: any
}

export type CockpitImageResponse = string
