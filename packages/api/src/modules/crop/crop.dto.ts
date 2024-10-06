// src/modules/plantation/plantation.dto.ts
import { t } from "elysia";

const plantationObject = {
	_id: t.String(),
	user: t.String(),
	area: t.String(),
	plantationType: t.Optional(t.String()),
	geoLocation: t.Optional(t.String()),
	daysSinceLastIrrigation: t.Optional(t.String()),
	coordinates: t.Object({
		lat: t.Number(),
		lon: t.Number(),
	}),
	createdAt: t.String(),
	updatedAt: t.String(),
};

export const createPlantationDto = {
	body: t.Object({
		area: t.String(),
		plantationType: t.Optional(t.String()),
		geoLocation: t.Optional(t.String()),
		daysSinceLastIrrigation: t.Optional(t.String()),
		coordinates: t.Object({
			lat: t.Number(),
			lon: t.Number(),
		}),
	}),
};

export const updatePlantationDto = {
	body: t.Object({
		area: t.Optional(t.String()),
		plantationType: t.Optional(t.String()),
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

export const getPlantationDto = {
	params: t.Object({
		id: t.String(),
	}),
};

export const deletePlantationDto = {
	params: t.Object({
		id: t.String(),
	}),
};

export const listPlantationsDto = {
	query: t.Object({
		page: t.Optional(t.Numeric()),
		limit: t.Optional(t.Numeric()),
	}),
};

export const plantationResponseDto = {
	response: t.Object(plantationObject),
};

export const listPlantationsResponseDto = {
	response: t.Object({
		plantations: t.Array(t.Object(plantationObject)),
		total: t.Number(),
		page: t.Number(),
		totalPages: t.Number(),
	}),
};

export const deletePlantationResponseDto = {
	response: t.Union([t.Object(plantationObject), t.Null()]),
};
