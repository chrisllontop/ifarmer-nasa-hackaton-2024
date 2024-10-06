import { t } from "elysia";

export const CropDto = t.Object({
	id: t.String(),
	user: t.String(),
	area: t.String(),
	cropType: t.Optional(t.String()),
	waterSource: t.Optional(t.String()),
	waterAmount: t.Optional(t.String()),
	irrigationSystem: t.Optional(t.String()),
	geoLocation: t.Optional(t.String()),
	lastIrrigationDate: t.Optional(t.String()),
	coordinates: t.Object({
		lat: t.Number(),
		lon: t.Number(),
	}),
});

export const CropParamsDto = t.Object({
	id: t.String(),
});

export const createCropDto = {
	body: t.Omit(CropDto, ["id", "user"]),
};

export const updateCropDto = {
	body: t.Omit(CropDto, ["id", "user"]),
	params: CropParamsDto,
};

export const deleteCropDto = {
	params: t.Object({
		id: t.String(),
	}),
};
