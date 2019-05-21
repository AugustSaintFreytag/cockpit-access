import Addresses from "../configuration/address-register"
import { Url, UrlComponent } from "../library/url"
import { Connection } from "../library/connection"
import { QueryParameterProvider } from "./query-parameter-provider"
import { CockpitImageRequest } from "../models/cockpit-image"

export namespace CockpitAssetPathProvider {

	function address(): Connection.Address {
		return Addresses.defaultAddress()
	}

	function token() {
		return address().token()
	}

	function pathPrefix() {
		const currentAddress = address()
		return `${currentAddress.protocol(Connection.Context.Client)}://${currentAddress.host(Connection.Context.Client)}`
	}

	export function cockpitAsset(component: UrlComponent): Url {
		return `${pathPrefix()}${component}`
	}

	export function cockpitImage(component: UrlComponent, imageRequest: CockpitImageRequest): Url {
		const sourcePath = component
		const imageRequestOptions = imageRequest.options(sourcePath) as QueryParameterProvider.ParameterDictionary

		const joinedImageRequestOptions = QueryParameterProvider.joinedParameters(imageRequestOptions)
		const imageUrl: Url = `${pathPrefix()}/api/cockpit/image?token=${token()}&${joinedImageRequestOptions}`

		return imageUrl
	}

}