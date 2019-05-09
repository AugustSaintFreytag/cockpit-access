import { Url, UrlComponent } from "../library/url"
import { CockpitImageRequestPreset } from "../library/cockpit-image-request-presets"
import { Connection } from "../library/connection"
import { QueryParameterProvider } from "./query-parameter-provider"
import Addresses from "../configuration/address-register"

export namespace CockpitAssetPathProvider {

	function address(): Connection.Address {
		return Addresses.defaultAddress()
	}

	function token() {
		return address().token
	}

	function pathPrefix() {
		const currentAddress = address()
		return `${currentAddress.clientProtocol()}://${currentAddress.clientHost()}`
	}

	export function cockpitAsset(component: UrlComponent): Url {
		return `${pathPrefix()}${component}`
	}

	export function cockpitImage(component: UrlComponent, format?: CockpitImageRequestPreset.Format|undefined): Url {
		const sourcePath = component

		const imageRequest = CockpitImageRequestPreset.preset(format || CockpitImageRequestPreset.Format.Regular)
		const imageRequestOptions = imageRequest.options(sourcePath) as QueryParameterProvider.ParameterDictionary

		const joinedImageRequestOptions = QueryParameterProvider.joinedParameters(imageRequestOptions)
		const imageUrl: Url = `${pathPrefix()}/api/cockpit/image?token=${token}&${joinedImageRequestOptions}`

		return imageUrl
	}

}