import { URL } from "library/types"

// Options

export class CockpitImageRequest {

	mode: CockpitImageOptions.Mode = CockpitImageOptions.Mode.BestFit
	filters: CockpitImageOptions.Filter[] = []
	
	width: number|undefined
	height: number|undefined
	quality: number|undefined

	returnsImageData: boolean = true
	includesDomainPath: boolean = false
	isBase64Encoded: boolean = false

	constructor({mode, filters, width, height, quality, returnsImageData, includesDomainPath, isBase64Encoded}: {
		mode?: CockpitImageOptions.Mode
		filters?: CockpitImageOptions.Filter[]
		width?: number
		height?: number
		quality?: number
		returnsImageData?: boolean
		includesDomainPath?: boolean
		isBase64Encoded?: boolean
	}) {
		if (mode) {
			this.mode = mode
		}

		if (filters) {
			this.filters = filters
		}
		
		if (width) {
			this.width = width
		}

		if (height) {
			this.height = height
		}
		
		if (quality) {
			this.quality = quality
		}

		if (returnsImageData !== undefined) {
			this.returnsImageData = returnsImageData
		}
		
		if (includesDomainPath !== undefined) {
			this.includesDomainPath = includesDomainPath
		}
		
		if (isBase64Encoded !== undefined) {
			this.isBase64Encoded = isBase64Encoded
		}
	}

	// Formed Options

	options(source: URL): CockpitImageOptions.Parameters {
		return {
			src: source,
			m: this.mode,
			w: this.width,
			h: this.height,
			q: this.quality,
			o: this.returnsImageData,
			d: this.includesDomainPath,
			b64: this.isBase64Encoded
		}
	}

}

// Library

export namespace CockpitImageOptions {

	export type Filter = string

	export enum Mode {
		Thumbnail = "thumbnail",
		BestFit = "bestFit",
		Resize = "resize",
		FitToWidth = "fitToWidth",
		FitToHeight = "fitToHeight"
	}

	export interface Parameters {
		src?: URL,
		m?: string,
		w?: number,
		h?: number,
		q?: number,
		o?: boolean,
		d?: boolean,
		b64?: boolean
	}

}