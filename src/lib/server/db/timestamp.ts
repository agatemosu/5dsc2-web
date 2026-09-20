import { customType } from 'drizzle-orm/sqlite-core';

export const instant = customType<{
	data: Temporal.Instant;
	driverData: number;
}>({
	dataType() {
		return 'integer';
	},
	fromDriver(value) {
		return Temporal.Instant.fromEpochMilliseconds(value * 1000);
	},
	toDriver(value) {
		return Math.floor(value.epochMilliseconds / 1000);
	},
});
