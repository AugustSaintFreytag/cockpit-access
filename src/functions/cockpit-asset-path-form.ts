import { addressRegister } from "~/configuration/address-register"
import { joinedParameters, ParameterDictionary } from "~/functions/query-parameter-form"
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

export function cockpitAsset(component: URLComponent, context: Context = Context.Client, prefix: boolean = true): URL {
	return `${pathPrefix(context)}${cockpitAssetComponent(component)}`
}

export function cockpitAssetComponent(component: URLComponent): URLComponent {
	return `/storage/uploads${standardizedPathComponent(component)}`
}

// Image Path

export function cockpitImage(component: URLComponent, imageRequest: CockpitImageRequest, context: Context = Context.Client): URL {
	return `${pathPrefix(context)}/${cockpitImageComponent(component, imageRequest)}`
}

export function cockpitImageComponent(component: URLComponent, imageRequest: CockpitImageRequest): URL {
	const imageRequestOptions = imageRequest.options(standardizedPathComponent(component)) as ParameterDictionary
	const joinedImageRequestOptions = joinedParameters(imageRequestOptions)
	const imageUrl: URL = `/api/cockpit/image?token=${token()}&${joinedImageRequestOptions}`

	return imageUrl
}

// Utility

function standardizedPathComponent(component: URLComponent): string {
	if (component[0] === "/") {
		return component
	}

	return "/" + component
}