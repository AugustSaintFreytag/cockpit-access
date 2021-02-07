import { URL } from "~/library/types"

export type Protocol = string
export type APIToken = string

export interface Address {
	protocol(context?: Context): Protocol
	host(context?: Context): URL
	token(): APIToken
}

export enum Environment {
	Live = "live",
	Development = "development"
}

export enum Context {
	Server,
	Client
}