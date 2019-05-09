import { Url } from "./url"

export namespace Connection {

	export type Protocol = string
	export type ApiToken = string

	export interface Address {
		clientProtocol(): Protocol
		clientHost(): Url

		serverProtocol(): Protocol
		serverHost(): Url

		protocol(): Protocol
		host(): Url

		token(): ApiToken
	}

	export enum Environment {
		Live,
		Development
	}

	export enum Context {
		Server,
		Client
	}

}