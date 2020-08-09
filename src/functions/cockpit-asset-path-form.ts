import { addressRegister } from "@/configuration/address-register"
import * as QueryParameterProvider from "@/functions/query-parameter-form"
import * as Connection from "@/library/connection"
import { URL, URLComponent } from "@/library/types"
import { CockpitImageRequest } from "@/models/cockpit-image-request"

function address(): Connection.Address {
	return addressRegister.defaultAddress()
}

function token() {
	return address().token()
}

function pathPrefix() {
	const currentAddress = address()
	return `${currentAddress.protocol(Connection.Context.Client)}://${currentAddress.host(Connection.Context.Client)}`
}

export function cockpitAsset(component: URLComponent): URL {
	return `${pathPrefix()}${component}`
}

export function cockpitImage(component: URLComponent, imageRequest: CockpitImageRequest): URL {
	const sourcePath = component
	const imageRequestOptions = imageRequest.options(sourcePath) as QueryParameterProvider.ParameterDictionary

	const joinedImageRequestOptions = QueryParameterProvider.joinedParameters(imageRequestOptions)
	const imageUrl: URL = `${pathPrefix()}/api/cockpit/image?token=${token()}&${joinedImageRequestOptions}`

	return imageUrl
}