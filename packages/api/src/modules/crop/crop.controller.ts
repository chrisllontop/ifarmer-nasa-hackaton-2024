import { Elysia } from "elysia";
import { authenticator } from "../auth/auth.validator";
import {
	createCropDto,
	updateCropDto,
	getCropDto,
	deleteCropDto,
	listCropDto,
	cropResponseDto,
	listcropResponseDto,
	deleteCropResponseDto,
} from "./crop.dto";
import CropService from "./crop.service";

const cropService = new CropService();

export const cropController = (app: Elysia) =>
	app.group("/crops", (app) =>
		app
			.use(authenticator)
			.get(
				"/",
				async ({ user, query }) => {
					const page = Number(query.page) || 1;
					const limit = Number(query.limit) || 10;
					const result = await cropService.listByUserId(
						user._id.toString(),
						page,
						limit,
					);
					return {
						...result,
						crops: result.crops.map((p) => ({
							...p.toObject(),
							_id: p._id.toString(),
							user: p.user.toString(),
						})),
					};
				},
				{
					...listCropDto,
					...listcropResponseDto,
				},
			)
			.get(
				"/:id",
				async ({ params, user }) => {
					const crop = await cropService.findById(
						user._id.toString(),
						params.id,
					);
					if (!crop) return null;
					return {
						...crop.toObject(),
						_id: crop._id.toString(),
						user: crop.user.toString(),
					};
				},
				{
					...getCropDto,
					...cropResponseDto,
				},
			)
			.guard(createCropDto, (app) =>
				app.post(
					"/",
					async ({ user, body }) => {
						const crop = await cropService.create(user._id.toString(), body);
						return {
							...crop.toObject(),
							_id: crop._id.toString(),
							user: crop.user.toString(),
						};
					},
					{
						...cropResponseDto,
					},
				),
			)
			.guard(updateCropDto, (app) =>
				app.put(
					"/:id",
					async ({ params, body, user }) => {
						const crop = await cropService.update(
							user._id.toString(),
							params.id,
							body,
						);
						if (!crop) return null;
						return {
							...crop.toObject(),
							_id: crop._id.toString(),
							user: crop.user.toString(),
						};
					},
					{
						...cropResponseDto,
					},
				),
			)
			.guard(deleteCropDto, (app) =>
				app.delete(
					"/:id",
					async ({ params, user }) => {
						const crop = await cropService.delete(
							user._id.toString(),
							params.id,
						);
						if (!crop) return null;
						return {
							...crop.toObject(),
							_id: crop._id.toString(),
							user: crop.user.toString(),
						};
					},
					{
						...deleteCropResponseDto,
					},
				),
			),
	);
