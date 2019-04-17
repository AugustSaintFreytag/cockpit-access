import { Connection } from "../library/connection"

class AddressRegister {

	private defaultAddress: Connection.Address|undefined
	private addresses: {[key: string]: Connection.Address} = {}

	// Access

	get(key: string): Connection.Address {
		const address = this.addresses[key]

		if (!address) {
			throw new TypeError(`No registered address for key '${key}'.`)
		}

		return address
	}

	getDefault() {
		const address = this.defaultAddress

		if (!address) {
			throw new TypeError(`No registered default address.`)
		}

		return address
	}

	// Management

	register(address: Connection.Address, key: string) {
		this.addresses[key] = address
	}

	registerDefault(address: Connection.Address, key?: string) {
		if (key) {
			this.register(address, key)
		}

		this.defaultAddress = address
	}

	unset(key: string) {
		delete this.addresses[key]
	}

	unsetDefault() {
		this.defaultAddress = undefined
	}

}

const shared = new AddressRegister()

export default shared