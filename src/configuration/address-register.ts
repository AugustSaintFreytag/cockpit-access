import * as Connection from "~/library/connection"

export class AddressRegister {
	private storedDefaultAddress: Connection.Address | undefined
	private storedAddresses: { [key: string]: Connection.Address } = {}

	// Access

	address(key: string): Connection.Address {
		const address = this.storedAddresses[key]

		if (!address) {
			throw new TypeError(`No registered address for key '${key}'.`)
		}

		return address
	}

	defaultAddress() {
		const address = this.storedDefaultAddress

		if (!address) {
			throw new TypeError(`No registered default address.`)
		}

		return address
	}

	// Management

	register(address: Connection.Address, key: string) {
		this.storedAddresses[key] = address
	}

	registerDefault(address: Connection.Address, key?: string) {
		if (key) {
			this.register(address, key)
		}

		this.storedDefaultAddress = address
	}

	unset(key: string) {
		delete this.storedAddresses[key]
	}

	unsetDefault() {
		this.storedDefaultAddress = undefined
	}
}

export const addressRegister = new AddressRegister()
