import AddressRegister from "@/configuration/address-register"
import CockpitError from "@/library/cockpit-error"
import * as Connection from "@/library/connection"
import { Dictionary, URL } from "@/library/types"
import CockpitRequestOptions from "@/models/cockpit-request-options"
import { AnyCockpitResponse, CockpitCollectionResponse, CockpitSingletonResponse } from "@/models/cockpit-response"
import axios from "axios"
import * as path from "path"


type AnyRequestObject = Dictionary<any>

// Options

function defaultOptions(): AnyRequestObject {
	return {
		populate: 3
	}
}

// Typed Fetch

export async function recordsInCollection(collection: string, requestOptions?: CockpitRequestOptions): Promise<CockpitCollectionResponse> {
	const route = `api/collections/get/${collection}`
	return await data(route, requestOptions)
}

export async function singletonRecord(singleton: string, requestOptions?: CockpitRequestOptions): Promise<CockpitSingletonResponse> {
	const route = `api/singletons/get/${singleton}`
	return await data(route, requestOptions)
}

// General Fetch

export async function data(route: string, requestOptions?: CockpitRequestOptions): Promise<AnyCockpitResponse> {
	const url = preparedUrl(route)

	try {
		const options = preparedOptions(defaultOptions(), requestOptions || {})
		const serverResponse = await axios.post(url, options)

		return serverResponse.data as CockpitCollectionResponse
	} catch (err) {
		throw new CockpitError(`Could not get response from cockpit for url '${obfuscatedUrl(url)}'. ${err}`)
	}
}

function obfuscatedUrl(url: URL): URL {
	return url.replace(/(token=)([a-fA-F0-9]+)(&*)/, "$1redacted$3")
}

// Preparation

function preparedUrl(route: string): URL {
	const currentAddress = address()

	const protocol = currentAddress.protocol()
	const host = currentAddress.host()
	const token = currentAddress.token()
	
	return `${protocol}://${path.join(host, route)}?token=${token}`
}

function preparedOptions(baseOptions: AnyRequestObject, requestOptions: AnyRequestObject): AnyRequestObject {
	const mergedOptions = baseOptions
	
	for (const key in requestOptions) {
		const value = requestOptions[key]
		
		if (typeof value === "object" && value !== null) {
			mergedOptions[key] = preparedOptions(mergedOptions[key] || {}, value)
		} else {
			mergedOptions[key] = value
		}
	}

	return mergedOptions
}

function address(): Connection.Address {
	return AddressRegister.defaultAddress()
}