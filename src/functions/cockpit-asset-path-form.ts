import { addressRegister } from "~/configuration/address-register"
import { urlComponentFromParameters, URLParameterDictionary } from "~/functions/query-parameter-form"
import { Address, Context } from "~/library/connection"
import { URL, URLComponent } from "~/library/types"
import { CockpitImageRequest } from "~/models/cockpit-image-request"

// Configuration

function address(): Address {
	return addressRegister.defaultAddress()
}

function token() {
	return address().token()
}

function pathPrefix(context: Context) {
	const currentAddress = address()
	return `${currentAddress.protocol(context)}://${currentAddress.host(context)}`
}

// Asset Path

/** Returns the full path to an asset managed by Cockpit, including a prefix
 * suitable to be accessed from the given context (default: Client). */
export function cockpitAsset(component: URLComponent, context: Context = Context.Client, prefix: boolean = true): URL {
	return `${pathPrefix(context)}${cockpitAssetComponent(component)}`
}

/** Returns the local path component to an asset managed by Cockpit. */
export function cockpitAssetComponent(component: URLComponent): URLComponent {
	return `/storage/uploads${standardizedPathComponent(component)}`
}

// Image Path

/** Returns the full path to an image managed by Cockpit, including a prefix
 * suitable to be accessed from the given context (default: Client). */
export function cockpitImage(component: URLComponent, imageRequest: CockpitImageRequest, context: Context = Context.Client): URL {
	return `${pathPrefix(context)}${cockpitImageComponent(component, imageRequest)}`
}

/** Returns the local path component to an image managed by Cockpit. */
export function cockpitImageComponent(component: URLComponent, imageRequest: CockpitImageRequest): URL {
	const imageRequestOptions = imageRequest.options(standardizedPathComponent(component)) as URLParameterDictionary
	const joinedImageRequestOptions = urlComponentFromParameters(imageRequestOptions)
	const imageUrl: URL = `/api/cockpit/image?token=${token()}&${joinedImageRequestOptions}`

	return imageUrl
}

// Utility

/** Returns a standardized path component with a leading slash character. */
function standardizedPathComponent(component: URLComponent): string {
	if (component[0] === "/") {
		return component
	}

	return "/" + component
}
