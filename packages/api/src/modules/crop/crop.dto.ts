import { t } from "elysia";

const cropObject = {
	_id: t.String(),
	user: t.String(),
	area: t.String(),
	cropType: t.Optional(t.String()),
	geoLocation: t.Optional(t.String()),
	daysSinceLastIrrigation: t.Optional(t.String()),
	coordinates: t.Object({
		lat: t.Number(),
		lon: t.Number(),
	}),
	createdAt: t.String(),
	updatedAt: t.String(),
};

export const createCropDto = {
	body: t.Object({
		area: t.String(),
		cropType: t.Optional(t.String()),
		geoLocation: t.Optional(t.String()),
		daysSinceLastIrrigation: t.Optional(t.String()),
		coordinates: t.Object({
			lat: t.Number(),
			lon: t.Number(),
		}),
	}),
};

export const updateCropDto = {
	body: t.Object({
		area: t.Optional(t.String()),
		cropType: t.Optional(t.String()),
		geoLocation: t.Optional(t.String()),
		daysSinceLastIrrigation: t.Optional(t.String()),
		coordinates: t.Optional(
			t.Object({
				lat: t.Number(),
				lon: t.Number(),
			}),
		),
	}),
	params: t.Object({
		id: t.String(),
	}),
};

export const getCropDto = {
	params: t.Object({
		id: t.String(),
	}),
};

export const deleteCropDto = {
	params: t.Object({
		id: t.String(),
	}),
};

export const listCropDto = {
	query: t.Object({
		page: t.Optional(t.Numeric()),
		limit: t.Optional(t.Numeric()),
	}),
};

export const cropResponseDto = {
	response: t.Object(cropObject),
};

export const listcropResponseDto = {
	response: t.Object({
		crops: t.Array(t.Object(cropObject)),
		total: t.Number(),
		page: t.Number(),
		totalPages: t.Number(),
	}),
};

export const deleteCropResponseDto = {
	response: t.Union([t.Object(cropObject), t.Null()]),
};
