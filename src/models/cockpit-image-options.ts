import { URL } from "~/library/types"

export type CockpitImageFilter = string

export enum CockpitImageFitMode {
	Thumbnail = "thumbnail",
	BestFit = "bestFit",
	Resize = "resize",
	FitToWidth = "fitToWidth",
	FitToHeight = "fitToHeight"
}

export interface CockpitImageParameters {
	src?: URL
	m?: string
	w?: number
	h?: number
	q?: number
	o?: boolean
	d?: boolean
	b64?: boolean
}
