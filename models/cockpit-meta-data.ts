import { UUID } from "../library/uuid"
import { CockpitEntry } from "../models/cockpit-entry"
import { ConversionProvider } from "../providers/conversion-provider"

export class CockpitMetaData {
	
	id: UUID
	
	creator: UUID
	editor: UUID|undefined

	created: Date
	modified: Date|undefined

	constructor(entry: CockpitEntry) {
		this.id = entry._id
		this.creator = entry._by
		this.editor = entry._mby || undefined

		if (entry._created) {
			this.created = ConversionProvider.dateFromTimestamp(entry._created)!
		} else {
			this.created = new Date()
		}

		if (entry._modified) {
			this.modified = ConversionProvider.dateFromTimestamp(entry._modified)
		}
	}

}