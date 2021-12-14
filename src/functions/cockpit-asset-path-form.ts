import { addressRegister } from "~/configuration/address-register"
import { joinedParameters, ParameterDictionary } from "~/functions/query-parameter-form"
import { Address, Context } from "~/library/connection"
import { URL, URLComponent } from "~/library/types"
import { CockpitImageRequest } from "~/models/cockpit-image-request"

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

function assetPathComponent() {
	return "storage/uploads"
}

export function cockpitAsset(component: URLComponent, context: Context = Context.Client): URL {
	return `${pathPrefix(context)}/${assetPathComponent()}${component}`
}

export function cockpitImage(component: URLComponent, imageRequest: CockpitImageRequest, context: Context = Context.Client): URL {
	const sourcePath = component
	const imageRequestOptions = imageRequest.options(sourcePath) as ParameterDictionary

	const joinedImageRequestOptions = joinedParameters(imageRequestOptions)
	const imageUrl: URL = `${pathPrefix(context)}/api/cockpit/image?token=${token()}&${joinedImageRequestOptions}`

	return imageUrl
}
