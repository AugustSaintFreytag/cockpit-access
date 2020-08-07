import { URL } from "@/library/types"

export type Protocol = string
export type ApiToken = string

export interface Address {
	protocol(context?: Context): Protocol
	host(context?: Context): URL
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