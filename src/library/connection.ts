import { Url } from "./url"

export namespace Connection {

	export type Protocol = string
	export type ApiToken = string

	export interface Address {
		protocol(context?: Context): Protocol
		host(context?: Context): Url
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