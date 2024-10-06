import { type Static, t } from "elysia";

export const MetadataDto = t.Object({
	createdAt: t.Date(),
	updatedAt: t.Date(),
});

export type MetaDataType = Static<typeof MetadataDto>;

export type WithMetadata<T> = T & MetaDataType;

export const PaginationQueryDto = t.Object({
	page: t.Optional(t.Numeric()),
	limit: t.Optional(t.Numeric()),
});
