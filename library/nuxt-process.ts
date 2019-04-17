export interface NuxtProcess extends NodeJS.Process {

	client?: boolean
	server?: boolean
	static?: boolean

}