import { URL } from "~/library/types"
import { Filter as CockpitImageFilter, Mode as CockpitImageMode, Parameters as CockpitImageParameters } from "~/models/cockpit-image-options"

// Options

export class CockpitImageRequest {

	mode: CockpitImageMode = CockpitImageMode.BestFit
	filters: CockpitImageFilter[] = []
	
	width: number|undefined
	height: number|undefined
	quality: number|undefined

	returnsImageData: boolean = true
	includesDomainPath: boolean = false
	isBase64Encoded: boolean = false

	constructor({mode, filters, width, height, quality, returnsImageData, includesDomainPath, isBase64Encoded}: {
		mode?: CockpitImageMode
		filters?: CockpitImageFilter[]
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

	options(source: URL): CockpitImageParameters {
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