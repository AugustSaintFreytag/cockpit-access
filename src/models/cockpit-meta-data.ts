import * as CockpitDateConverter from "~/functions/cockpit-date-conversion"
import { UUID } from "~/library/types"
import { CockpitEntry } from "~/models/cockpit-entry"

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
			this.created = CockpitDateConverter.dateFromTimestamp(entry._created)!
		} else {
			this.created = new Date()
		}

		if (entry._modified) {
			this.modified = CockpitDateConverter.dateFromTimestamp(entry._modified)
		}
	}

}