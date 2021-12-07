import { URL } from "~/library/types"

export type Filter = string

export enum Mode {
	Thumbnail = "thumbnail",
	BestFit = "bestFit",
	Resize = "resize",
	FitToWidth = "fitToWidth",
	FitToHeight = "fitToHeight"
}

export interface Parameters {
	src?: URL
	m?: string
	w?: number
	h?: number
	q?: number
	o?: boolean
	d?: boolean
	b64?: boolean
}
